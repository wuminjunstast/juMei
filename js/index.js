$(function() {
	// 用来保存倒计时的时间
	var starttime = '';

	// 加载公共部分
	$('#header').load('./header.html');
	$.getScript('js/header.js');
	$('#rightmenu').load('./rightmenu.html');
	$.getScript('js/rightmenu.js');
	$('#footer').load('./footer.html');
	$.getScript('js/footer.js');

	// 提取json的数据
	$.getJSON('json/index.json', function(data) {
		var len = data.length;
		// 根据json文件的信息数量创建li
		for (i = 0; i < len; i++) {
			var newlist = creatlist();
			$('#product_list').append(newlist);
		}

		// 把json的数据添加进li中
		var $getElement = $('.main .product>ul li');
		for (i = 0; i < len; i++) {
			var globalBan = data[i].classicon;
			$getElement.eq(i).find('.proimg').attr('src', 'img/index/' + data[i].imgurl + '_dx_1000_400.jpg');
			$getElement.eq(i).find('.title').text(data[i].title);
			$getElement.eq(i).find('.price>span').text(data[i].price);
			$getElement.eq(i).find('.classicon>img').css('margin-left', globalBan);

			// 根据偏移值确定global长条悬浮的内容
			switch (globalBan) {
				case '-370px':
					$getElement.eq(i).find('.global').text('海外直采 海外价格 闪电发货');
					break;
				case '-40px':
					$getElement.eq(i).find('.global').text('新品上市，赶紧入手试试吧').css('background', 'rgba(3,172,179,0.8)');

					// 创建一个划线价和倒计时的结构
					var newtime = '<em>￥</em><span class="deleteprice"></span><span class="time_box"></span>';
					$getElement.eq(i).find('.price').append(newtime);
					$getElement.eq(i).find('.deleteprice').text(data[i].deleteprice);
					starttime = new Date('2020/6/8');
					var test = setInterval(countdown, 1000);
					break;
			}
		}


		// 加入购物车
		$('.main .product>ul').on('click', '.add', function() {
			// 点击时改变这个按钮的颜色
			$(this).css('background', '#f7fa04');
			$(this).parent().siblings().find('.add').css('background', '#ed155b');

			// 取出local，并将其由字符串转化为对象
			var storage = window.localStorage;
			var jsonObj = JSON.parse(storage.getItem("data"));
			// 记录是否已经登录
			var flag = false;

			// 遍历，若是已经登录账户，在账户页面已经把control值设为yes
			for (var i = 0; i < jsonObj.length; i++) {
				if (jsonObj[i].control == 'yes') {
					// 取出这个用户
					flag = true;
					index = i;
				}
			}
			// 若是未登录则提醒用户进行登录
			if (!flag) {
				alert('您还没有登录，请前往登录页面!');
				return false;
			}

			// 把商品信息进行保存
			// 获取当前点击的父亲的li的index，
			var $li_index = $(this).parent().index();
			var newshopcar;
			// 若local中还没有购物车信息，则先创建一个空数组，若有信息，则把里边的数组提取并赋值
			if (jsonObj[index].shopcar == '') {
				newshopcar = [];
			} else {
				newshopcar = jsonObj[index].shopcar;
			}

			// 记录购物车中是否有相同的商品
			var result = false;
			//查找购物车中是否有该商品
			for (var i in newshopcar) {
				if (newshopcar[i] != null) {
					if (newshopcar[i].id == data[$li_index].id && newshopcar[i].color == data[$li_index].color) {
						console.log(parseInt(newshopcar[i].amount));
						newshopcar[i].amount = parseInt(data[$li_index].amount) + parseInt(newshopcar[i].amount);
						result = true;
					}
				}
			}
			//没有该商品就直接加进去
			if (!result) {
				newshopcar.push(data[$li_index]);
			}

			// 留着用来测试时删除购物车
			// newshopcar = [];

			// 把新的数组赋值给原数组
			jsonObj[index].shopcar = newshopcar;
			// 保存进local中
			storage.setItem('data', JSON.stringify(jsonObj));
			console.log(storage);
		});
	});




	// 滚动出现左侧导航
	$(document).scroll(function() {
		var scroH = $(document).scrollTop();
		var $li = $('.flnav>ul li');
		var $up = $li.eq(1);
		var $down = $li.eq(2);
		if (scroH > 530) {
			$('.flnav').stop().fadeIn();
			$up.find('img').addClass('imgclick');
			$up.find('span').addClass('spanclick');
		} else {
			$li.find('img').removeClass('imgclick');
			$li.find('span').removeClass('spanclick');
			$('.flnav').stop().fadeOut();
		}
		if (scroH > 600) {
			$down.siblings().find('img').removeClass('imgclick');
			$down.siblings().find('span').removeClass('spanclick');
			$down.find('img').addClass('imgclick');
			$down.find('span').addClass('spanclick');
		}
	});


	// 左侧导航,click返回false可以解决两个时间的冲突
	$('.flnav>ul li').not(':first').hover(function() {
		$(this).find('img').addClass('imghover');
		$(this).find('span').addClass('spanhover');
	}, function() {
		$(this).find('img').removeClass('imghover');
		$(this).find('span').removeClass('spanhover');
	}).click(function() {
		$(this).find('img').removeClass('imghover').addClass('imgclick');
		$(this).siblings().find('img').removeClass('imghover').removeClass('imgclick');
		$(this).find('span').removeClass('spanhover').addClass('spanclick');
		$(this).siblings().find('span').removeClass('spanhover').removeClass('spanclick');
		return false;
	});

	// 产品列表的鼠标悬浮效果
	$('.main .product>ul').on('mouseover', 'li', function() {
		$(this).find('div').css('display', 'block');
	});
	$('.main .product>ul').on('mouseout', 'li', function() {
		$(this).find('div').css('display', 'none');
	});


	// 倒计时
	function countdown() {
		var nowtime = new Date();
		var time = starttime - nowtime;
		if (time <= 0) {
			clearInterval(test);
		} else {
			var day = parseInt(time / 1000 / 60 / 60 / 24);
			var hour = parseInt(time / 1000 / 60 / 60 % 24);
			var minute = parseInt(time / 1000 / 60 % 60);
			var seconds = parseInt(time / 1000 % 60);
			$('.time_box').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
		}
	}



});

// 创建li结构
function creatlist() {
	var newlist = '<li>' +
		'<a href="detailPageOne.html" target="_blank">' +
		'<img class="proimg">' +
		'<div class="global"></div>' +
		'<p class="title"></p>' +
		'<p class="price">￥<span></span></p>' +
		'</a>' +
		'<span class="classicon"><img src="img/index/home_all_icon.png"></span>' +
		'<a href="detailPageone.html" target="_blank" class="coverbox"><div class="cover"></div></a>' +
		'<div class="add">加入购物车</div>' +
		'</li>';
	return newlist;
}
