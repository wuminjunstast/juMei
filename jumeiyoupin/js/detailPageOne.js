$(function() {
	$('.select').hover(function() {
		var $num = $(this).prevAll().length;
		$('.select.current').removeClass('current');
		$(this).addClass('current');
		$('.selectp.current').removeClass('current');
		$('.selectp').eq($num).addClass('current');
	})
	
	//加
	$('.sub').click(function() {
		var text = $(this).prev().val();
		var num = parseInt(text) + 1;
		if (num > 99) {
			alert('您购买的太多啦');
		} else {
			$(this).prev().val(num);
		}

	});
	//减
	$('.add').click(function() {
		var text = $(this).next().val();
		var num = parseInt(text) - 1;
		if (num < 1) {
			alert('输入错误！');
		} else {
			$(this).next().val(num);
		}
	});

	var up = $('.fenlei>div>h3>i');
	var a = false;
	$(up).click(function() {
		if (a == false) {
			$(this).parent().next().css('display', 'none');
			$(this).css('backgroundPosition', '0 -29px');
			a = true;
		} else {
			$(this).parent().next().css('display', 'block');
			$(this).css('backgroundPosition', '0 0');
			a = false;

		}
		// console.log(a);
	});
	$('.slide_menu>ul>li>a').hover(function() {
		$(this).css('color', '#000');
		$(this).css('background', '#fff');
	});
	$('.slide_menu>ul>li>a').mouseleave(function() {
		$(this).css('color', '#fff');
		$(this).css('background', '#2b2b2b');
	})
	//高度触发菜单
	$(document).scroll(function() {
		var height = $(document).scrollTop();

		if (height > 950) {
			$('.slide_menu').css('position', 'fixed');
			$('.slide_menu').css('top', '0');
			$('.slide_menu').css('width', '880px');
			$('.black_header').css('display', 'block');
		}
		if (height < 950) {
			$('.slide_menu').css('position', 'relative');
			$('.slide_menu').css('width', '880px');
			$('.black_header').css('display', 'none');
		}

	});
	$('#header').load('header.html');
	$.getScript('js/header.js');
	$('#rightmenu').load('rightMenu.html');
	$.getScript('js/rightMenu.js');
	$('#footer').load('footer.html');
	$.getScript('js/footer.js');
	//倒计时
	var starttime = new Date("2020/6/04");
	setInterval(function() {
		var nowtime = new Date();
		var time = starttime - nowtime;
		var day = parseInt(time / 1000 / 60 / 60 / 24);
		var hour = parseInt(time / 1000 / 60 / 60 % 24);
		var minute = parseInt(time / 1000 / 60 % 60);
		var seconds = parseInt(time / 1000 % 60);
		$('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
	}, 1000);
	$("#exzoom").exzoom({
		autoPlay: false,
	});

	var storage = window.localStorage;
	var jsonObj = JSON.parse(storage.getItem("data"));

	// 点击收藏
	$('.detail_like').click(function() {
		if (jsonObj == undefined) {
			alert('请先登录');
		} else {
			alert('加入成功');
		}
	});



	$('.detail_dj').click(function() {
		if (jsonObj != undefined) {
			var i = $('.num_detail>input').val();

			$('.detail_button>span').css('display', 'block');
			setTimeout(function() {
				$('.detail_button>span').css('display', 'none');
			}, 2000);

			// console.log(localStorage.getItem('cart'));
			var cart = localStorage.getItem('data');
				cart = JSON.parse(cart);
				
			//判断登录
			var flag = false;
			var index = 0;
			// 遍历，若是已经登录账户，在账户页面已经把control值设为yes
			for (var i = 0; i < cart.length; i++) {
				if (cart[i].control == 'yes') {
					// 取出这个用户
					flag = true;
					index = i;
				}
			}
			
			if(cart[index].shopcar == null){
				item=[
					
				];
			}else{
				item = cart[index].shopcar;
			}	
			//点击添加到购物车，将商品添加到购物车
			var product = {
				"id": '21',
				"title": $('.detail_text').text(),
				"color": '400ml',
				"imgurl": '2',
				"amount": parseFloat($('.product_text').val()),
				"price": parseFloat($('.detail_current').text())
			};
			//判断要添加到购物车中的商品，是否存在
			var exists = false; //购物车中是否存在此商品
			for (var i in item) {
				if (item[i].id == product.id) {
					// console.log('12');
					exists = true;
					item.amount += product.amount;
					break;
				}
			}
			if (!exists) {
				// console.log('aaa');
				item.push(product);
			}
			localStorage.setItem('data', JSON.stringify(cart));
			// localStorage.clear();
		}else {
			alert('您还未登录');
		}
	});

});
