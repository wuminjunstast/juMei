$(function() {

	$('.right_login.a').hover(function() {
		$('#right_img1').css('backgroundPosition', '-33px 0');
		$('.right_login.a>a').css('background-color', '#ed145b');
	})
	$('.right_login.a').mouseleave(function() {
		$('#right_img1').css('backgroundPosition', '0 0');
		$('.right_login.a>a').css('background-color', '#444851');
	})
	$('.right_login.b').hover(function() {
		$('#right_img5').css('backgroundPosition', '-33px -57px');
		$('.right_login.b>a').css('background-color', '#ed145b');
	})
	$('.right_login.b').mouseleave(function() {
		$('#right_img5').css('backgroundPosition', '0 -57px');
		$('.right_login.b>a').css('background-color', '#444851');
	})
	$('.right_login.c').hover(function() {
		$('#right_img3').css('backgroundPosition', '-33px -85px');
		$('.right_login.c>a').css('background-color', '#ed145b');
	})
	$('.right_login.c').mouseleave(function() {
		$('#right_img3').css('backgroundPosition', '0 -85px');
		$('.right_login.c>a').css('background-color', '#444851');
	})
	$('.right_login.d').hover(function() {
		$('#right_img4').css('backgroundPosition', '-36px -110px');
		$('.right_login.d>a').css('background-color', '#ed145b');
	})
	$('.right_login.d').mouseleave(function() {
		$('#right_img4').css('backgroundPosition', '-4px -110px');
		$('.right_login.d>a').css('background-color', '#444851');
	})
	$('.right_cart').hover(function() {
		$('#right_img2').css('backgroundPosition', '-33px -29px');
		$('.right_cart>a').css('background', 'none');
		$('.right_cart>a').css('background-color', '#ed145b');

	});
	$('.right_cart').mouseleave(function() {
		$('#right_img2').css('backgroundPosition', '0 -29px');
		$('.right_cart>a').css('background', 'url(../img/ibar_sprites.png) no-repeat');
		$('.right_cart>a').css('backgroundPosition', '-23px -225px');
		$('.right_cart>a').css('background-color', '#444851');
	});
	$('.right_login.e').hover(function() {
		$('.right_login.e>a').css('background-color', '#ed145b');
	})
	$('.right_login.e').mouseleave(function() {
		$('.right_login.e>a').css('background-color', '#444851');
	});
	$('.right_login.f').hover(function() {
		$('.right_login.f>a').css('background-color', '#ed145b');
		$('#right_img8').css('backgroundPosition', '-33px -175px');
	})
	$('.right_login.f').mouseleave(function() {
		$('.right_login.f>a').css('background-color', '#444851');
		$('#right_img8').css('backgroundPosition', '0 -175px');
	});
	$('.right_login.g').hover(function() {
		$('.right_login.g>a').css('background-color', '#ed145b');
		$('#right_img9').css('backgroundPosition', '-33px -201px');
	})
	$('.right_login.g').mouseleave(function() {
		$('.right_login.g>a').css('background-color', '#444851');
		$('#right_img9').css('backgroundPosition', '0 -201px');
	});
	$('.right_login.g').click(function() {
		$('html').animate({
			scrollTop: '0'
		}, 300);

	})

	var cart = localStorage.getItem('cart');
	if (cart != undefined) {
		cart = JSON.parse(cart);
		var num = 0;
		for (var i = 0; i < cart.items.length; i++) {
			var productitem = cart.items[i];
			var productnum = parseInt(productitem.amount);
			num += productnum;
			$('#right-text1').text(num);
		}
	}
});
