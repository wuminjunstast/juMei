$(function() {
	$(document).ready(function() {
		var mySwiper = new Swiper('.swiper-container', {
			loop: true, // 循环模式选项
			//分页器
			pagination: {
				el: '.swiper-pagination',
			},
			autoplay: {
				disableOnInteraction: false, //手动滑动之后不打断播放
				delay: 2000
			},
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
		});
	});
	$('.bt_head-c').hover(function() {
		$(this).children('div:first-child').addClass('pink');
		$('.pink').css('color', '#ec145a');

	});
	$('.bt_head-c').mouseleave(function() {
		$(this).children('div:first-child').removeClass();
		$(this).children('div:first-child').css('color', '#333');
	});
	$('.bt_head-c.a').hover(function() {
		$('.line').stop().animate({
			left: '36px'
		});
		// console.log('aaa');
		$('.bt_con.go').removeClass('go');
		$('.bt_con.a').addClass('go');

	});

	$('.bt_head-c.b').hover(function() {
		$('.line').stop().animate({
			left: '100px'
		})
		// console.log('aaa');
		$('.bt_con.go').removeClass('go');
		$('.bt_con.b').addClass('go');
	});

	// 	$('.bt_head-c.b').mouseleave(function() {
	// 		$('.bt_con.b').css('display', 'none');
	// 	});
	$('.bt_head-c.c').hover(function() {
		$('.line').stop().animate({
			left: '165px'
		})
		// console.log('aaa');
		$('.bt_con.go').removeClass('go');
		$('.bt_con.c').addClass('go');
	});

	// 	$('.bt_head-c.c').mouseleave(function() {
	// 		$('.bt_con.c').css('display', 'none');
	// 	});
	$('.slide-up').click(function() {
		$('.bt_con.go').css('display', 'none');
		$('.bt_con.go').animate({
			top: '0',
		})
	})
	//倒计时
	
	setInterval(function() {
		var starttime = new Date("2020 6,10 17:50:30");
		var starttimea = new Date("2020 6,07 12:30:02");
		var starttimeb = new Date("2020 6,04 08:38:59");
		var starttimec = new Date("2020/6/5");
		var nowtime = new Date();
		var time = starttime - nowtime;
		var timea = starttimea - nowtime;
		var timeb = starttimeb - nowtime;
		var timec = starttimec - nowtime;
		var day = parseInt(time / 1000 / 60 / 60 / 24);
		var daya = parseInt(timea / 1000 / 60 / 60 / 24);
		var dayb = parseInt(timeb / 1000 / 60 / 60 / 24);
		var dayc = parseInt(timec / 1000 / 60 / 60 / 24);
		var hour = parseInt(time / 1000 / 60 / 60 % 24);
		var houra = parseInt(timea / 1000 / 60 / 60 % 24);
		var hourb = parseInt(timeb / 1000 / 60 / 60 % 24);
		var hourc = parseInt(timec / 1000 / 60 / 60 % 24);
		var minute = parseInt(time / 1000 / 60 % 60);
		var minutea = parseInt(timea / 1000 / 60 % 60);
		var minuteb = parseInt(timeb / 1000 / 60 % 60);
		var minutec = parseInt(timec / 1000 / 60 % 60);
		var seconds = parseInt(time / 1000 % 60);
		var secondsa = parseInt(timea / 1000 % 60);
		var secondsb = parseInt(timeb / 1000 % 60);
		var secondsc = parseInt(timec / 1000 % 60);
		$('.timespan.a').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
		$('.timespan.b').html(daya + "天" + houra + "小时" + minutea + "分钟" + secondsa + "秒");
		$('.timespan.c').html(dayb + "天" + hourb + "小时" + minuteb + "分钟" + secondsb + "秒");
		$('.timespan.d').html(dayc + "天" + hourc + "小时" + minutec + "分钟" + secondsc + "秒");
	}, 1000);
	$('#header').load('header.html');
	$.getScript('js/header.js');
	$('#rightmenu').load('rightMenu.html');
	$.getScript('js/rightMenu.js');
	$('#footer').load('footer.html');
	$.getScript('js/footer.js');
});
