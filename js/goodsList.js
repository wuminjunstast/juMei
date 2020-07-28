// 鼠标划过内容区的li后，改变箭头的图片
$(function() {
	// 用于排序的数组
	var array = [];
	// 保存默认页面的内容
	var defaultArray = [];
	// 用于排序时暂时保存需要交换的变量
	var prev;
	var after;
	var flag = [0, 0, 0, 0];

	// 从json提取数据
	$.getJSON('json/goodslist.json', function(data) {
		var $getElement = $('.content_list #content_card');

		// 默认显示所有价格区间的商品
		lookfor(0, 9999);

		// 注册价格区间的点击事件
		$('.select_price').on('click', '.select_price_num>span', function() {
			$(this).css('color', '#f01d64');
			
			$(this).parent().siblings().children().css('color', '#666');

			var idx = $(this).parent().index();

			switch (idx) {
				case 0:
					lookfor(0, 99);
					break;
				case 1:
					lookfor(100, 299);
					break;
				case 2:
					lookfor(300, 359);
					break;
				case 3:
					lookfor(359, 9999);
					break;
			}
		});

		// 寻找符合价格的函数
		function lookfor(min, max) {
			// 清空商品列表
			$('.content_list').empty();

			// 记录该价格区间的商品数量
			var count = -1;
			// 遍历所有数据，取出符合价格区间的产品显示在页面中
			var len = data.length;
			for (i = 0; i < len; i++) {
				if (data[i].price >= min && data[i].price < max) {
					count++;
					var newlist = $('#content_card').clone();
					newlist.css('display', 'block');
					$('.content_list').append(newlist);

					var $getElement = $('.content_list #content_card');
					$getElement.eq(count).find('.content_list_img').attr('src', 'img/goodslist/' + data[i].img +
						'_350_350.jpg');
					$getElement.eq(count).find('.content_list_title').text(data[i].title);
					$getElement.eq(count).find('.content_list_price').text(data[i].price);
					$getElement.eq(count).find('.content_list_del').text(data[i].del);
					$getElement.eq(count).find('.content_list_sale').text(data[i].sale);
					// 把保存好的tag拆解成数组
					var content_tag = data[i].tag.split(',');
					$getElement.eq(count).find('.content_list_tag').empty();
					for (var j = 0; j < content_tag.length; j++) {
						var $newspan = $('<span>' + content_tag[j] + '</span>');
						$getElement.eq(count).find('.content_list_tag').append($newspan);
					}
				}
			}
			// 若是该价格区间没有商品，则提示换关键词
			if (count == -1) {
				$('.content_list').html('还没有商品哦~换个关键词吧！');
			}
			// 保存默认的数组
			$('.content_list #content_card').each(function(index) {
				// 保存进销量按钮是为了用户点击默认时使用
				defaultArray[index] = $(this);
			});
		}
	});

	// 按条件排序
	$('#contend_head_l li').each(function(index) {
		var priceclick = 1;
		// 点击非"排序"时更改样式
		if (index != 0) {
			$(this).click(function() {
				// 点击之后，把其他排序元素的样式进行修改
				$(this).addClass('bgwhite redtext');
				$(this).children('span').addClass('redarrow');
				$(this).siblings().removeClass('bgwhite redtext');
				$(this).siblings().children('span').removeClass('redarrow');

				// 把点前的列表保存进数组中
				$('.content_list #content_card').each(function(index) {
					array[index] = $(this);
				});

				switch (index) {
					case 1:
						showdiv(defaultArray);
						break;
					case 3:
						var newarr = arrsort('', '');
						showdiv(newarr);
						break;
				}

				// 对价格的样式进行处理,以及价格的排序
				if (index == 2) {
					var $idxchild = $(this).children('span');
					switch (priceclick % 3) {
						case 0:
							$idxchild.removeClass('redarrow downarrow');
							showdiv(defaultArray);
							break;
						case 1:
							$idxchild.addClass('redarrow');
							$idxchild.removeClass('downarrow');
							var newarr = arrsort('price', 'up');
							showdiv(newarr);
							break;
						case 2:
							$idxchild.addClass('downarrow');
							$idxchild.removeClass('redarrow');
							var newarr = arrsort('price', 'down');
							showdiv(newarr);
							break;
					}
					priceclick++;
				} else {
					// 点击了价格之后又点其他条件，则重置价格的样式
					priceclick = 1;
					$('#contend_head_l li').eq(2).children('span').removeClass('redarrow downarrow');
				}

			});
		}
	});

	// 对小卡片进行排序
	// a=price表示对价格进行排序，b=up表示升序，b=down表示降序
	function arrsort(a, b) {
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array.length - i - 1; j++) {
				if (a == 'price') {
					prev = array[j].find('.content_list_price').html();
					after = array[j + 1].find('.content_list_price').html();
				} else {
					prev = array[j].find('.content_list_sale').html();
					after = array[j + 1].find('.content_list_sale').html();
				}

				if (parseFloat(prev) < parseFloat(after)) {
					var temp = array[j + 1];
					array[j + 1] = array[j];
					array[j] = temp;
				}
			}
		}
		if (b == 'up') {
			array.reverse();
		}
		return array;
	}

	// 把数组的元素进行显示
	function showdiv(array) {
		$('.content_list').empty();
		for (var i = 0; i < array.length; i++) {
			$('.content_list').append(array[i]);
		}
	}
	$('#header').load('header.html');
	$.getScript('js/header.js');
	$('#footer').load('footer.html');
	$.getScript('js/footer.js');
});
