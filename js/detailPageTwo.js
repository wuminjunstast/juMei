$(function() {
	$('.select').hover(function() {
		var $num = $(this).prevAll().length;
		$('.select.current').removeClass('current');
		$(this).addClass('current');
		$('.selectp.current').removeClass('current');
		$('.selectp').eq($num).addClass('current');
	})
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
	$(document).scroll(function() {
		var height = $(document).scrollTop();

		if (height > 650) {
			$('.slide_menu').css('position', 'fixed');
			$('.slide_menu').css('top', '0');
			$('.slide_menu').css('width', '880px');
			$('.black_header').css('display', 'block');
		}
		if (height < 650) {
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
	$("#exzoom").exzoom({
		autoPlay: false,
	}); //方法调用，务必在加载完后执行

	var storage = window.localStorage;
	var jsonObj = JSON.parse(storage.getItem("data"));



	$('.btn>a').click(function() {
		if (jsonObj != undefined) {
			$('.btn>span').css('display', 'block');
			setTimeout(function() {
				$('.btn>span').css('display', 'none');
			}, 2000);


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

			if (cart[index].shopcar == null) {
				item = [

				];
			} else {
				item = cart[index].shopcar;
			}
			var product = {
				"id": '22',
				"title": $('.pro_text').text(),
				"color": $('.sizenum').text(),
				"imgurl": '1',
				"amount": "1",
				"price": parseFloat($('.price_text').text()),

			};
			//判断要添加到购物车中的商品，是否存在
			var exists = false; //购物车中是否存在此商品
			for (var i in item) {
				if (item[i].id == product.id) {
					exists = true;
					item.amount += product.amount;
					break;
				}
			}
			if (!exists) {
				item.push(product);
				console.log(cart);
			}
			localStorage.setItem('data', JSON.stringify(cart));
			// console.log(cart);
		} else {
			alert('您还未登录');
		}
	});
	// localStorage.clear();

});
