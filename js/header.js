$(function() {

	$('.jumei-item').hover(function() {
		$('.sub-nav').stop().slideDown('fast');
		$('.sub-nav').css('display', 'block');
		$('.jumei-item').css('background-color', '#fff');
		$('.jumei-item').css('border-bottom', '1px solid #fff');

	});
	$('.jumei-item').mouseleave(function() {
		$('.sub-nav').stop().slideUp('fast');
		$('.jumei-item').css('background-color', '#f2f2f2');
		$('.jumei-item').css('border-bottom', '1px solid #e5e5e5');
		// $('.sub-nav').css('display','none');
	});
	$('#jumei-item').hover(function() {
		$('.sub-nav1').stop().slideDown('fast');
		$('.sub-nav1').css('display', 'block');
		$('#jumei-item').css('background-color', '#fff');
		$('#jumei-item').css('border-bottom', '1px solid #fff');
		// console.log('aaa');
	});
	$('#jumei-item').mouseleave(function() {
		$('.sub-nav1').stop().slideUp('fast');
		// $('.sub-nav1').css('display','none');
		$('#jumei-item').css('background-color', '#f2f2f2');
		$('#jumei-item').css('border-bottom', '1px solid #e5e5e5');
		// console.log('aaa');
	});
	//美妆商城鼠标经过触发子菜单
	$('#header-child').hover(function() {
		$('.header_popmenu').stop().slideDown('fast');
		$('#header-child a').css('opacity', '0.5');
		$('.header_popmenu').css('display', 'block');
	});
	//美妆商城鼠标离开隐藏子菜单
	$('#header-child').mouseleave(function() {
		$('.header_popmenu').stop().slideUp('normal');
		$('#header-child a').css('opacity', '1');

	});
	//鼠标经过子菜单就停留
	$('.header_popmenu').hover(function() {
		$(this).stop().slideDown('fast');
		$(this).css('display', 'block');
		$('#header-child a').css('opacity', '0.5');

	});
	$('.header_popmenu').mouseleave(function() {
		$('#header-child a').css('opacity', '1');
		$(this).stop().slideUp('fast');
	});
	$('#cart').hover(function() {
		$('.header_numbox').stop().slideDown('fast');
		$(this).css('border-bottom', 'white');
		$('.header_numbox').css('display', 'block');
	});
	$('#cart').mouseleave(function() {
		$('.header_numbox').stop().slideUp('fast');
		$(this).css('border-bottom', '#e5e5e5');
	});
	$('.header_numbox').hover(function() {
		$(this).stop().slideDown('fast');
		$('#cart').css('border-bottom', 'white');
		$(this).css('display', 'block');
	});
	$('.header_numbox').mouseleave(function() {
		$(this).stop().slideUp('fast');
		$('#cart').css('border-bottom', '#e5e5e5');
	});


	var storage = window.localStorage;
	var jsonObj = JSON.parse(storage.getItem("data"));
	var data = localStorage.getItem('data');

	// 记录是否已经登录
	if (jsonObj != null) {
		for (var i = 0; i < jsonObj.length; i++) {
			if (jsonObj[i].control == 'yes') {
				$('.denglu').css('display', 'none');
				$('.zhuce').css('display', 'none');
				$('.user').css('display', 'block');
				$('.tuichu').css('display', 'block');
				$('.user').text(jsonObj[i].username);
			}
		};
	} 
	else {
		$('.denglu').css('display', 'block');
		$('.zhuce').css('display', 'block');
		$('.user').css('display', 'none');
		$('.tuichu').css('display', 'none');
	};
	$('.tuichu').click(function() {
		localStorage.clear();
		$('.denglu').css('display', 'block');
		$('.zhuce').css('display', 'block');
		$('.user').css('display', 'none');
		$('.tuichu').css('display', 'none');
	});
	if (data != undefined) {
		data = JSON.parse(data);
		var num = 0;
		
// 		for (var i = 0; i < data[index].shopcar.length; i++) {
// 			console.log(productitem);
// 			var productitem = data[index].shopcar[i];
// 			var productnum = parseInt(productitem.amount);
// 			num += productnum;
// 			$('.header_num').text('您已添加了' + num + '件商品');
// 		}
	}


});
