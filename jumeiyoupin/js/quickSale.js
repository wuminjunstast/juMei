$(function() {
	// 加载公共部分
	$('#rightmenu').load('./rightmenu.html');
	$.getScript('js/rightmenu.js');

	// 轮播图
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

	// nav的二级菜单
	$('.header_nav').on('mouseover', '.showsecondnav', function() {
		console.log('aaaa');
		$(this).children('.secondnav').stop().slideDown();
	});
	$('.header_nav').on('mouseout', '.showsecondnav', function() {
		$(this).children('.secondnav').stop().slideUp();
	});


	// 弹出层
	$('.last #quick_footer_list_layer').on('click', function() {
		layer.open({
			type: 1,
			title: ['请您选择咨询的类型', 'background:#e8155c;color:#fff;text-align:center;font-size:18px;'],
			area: ['270px', '254px'],
			shadeClose: true, //点击遮罩关闭
			content: '\<\div style="padding:20px;">自定义内容\<\/div>',
			anim: 1
		});
	});

	// 数据共享，若登录则显示用户名
	var storage = window.localStorage;
	var jsonObj = JSON.parse(storage.getItem("data"));
	// console.log(storage);
	for (var i = 0; i < jsonObj.length; i++) {
		if (jsonObj[i].control == 'yes') {
			var newlist = creatlogin();
			$('#islogin').html(newlist);
			// 取出这个用户
			$('#userlogin').text(jsonObj[i].username);
			var index = i;

			// 账号退出事件
			$('#exit').click(function() {
				jsonObj[index].control = '';
				console.log(jsonObj[index].control);
				storage.setItem('data', JSON.stringify(jsonObj));
				$('#islogin').html(
					'<a href="login.html" target="_blank" class="nologin">登录</a><img src="img/quick_sale/header_user_line.png" alt=""><a href="login.html" target="_blank" class="nologin">注册</a>'
				);
			});
		}

	}

	// 提取json数据
	$.getJSON('json/quick_sale.json', function(data) {
		console.log('aa');

		var len = data.length;
		// 根据json文件的信息数量创建li
		for (i = 0; i < len; i++) {
			var newlist = creattoday();
			$('.today_list').append(newlist);
		}
		// 把json的数据添加进li中
		var $getElement = $('.today_list>.det_shop');
		for (i = 0; i < len; i++) {
			$getElement.eq(i).find('.fl img').attr('src', 'img/quick_sale/' + data[i].img + '_dx_640_400.jpg');
			$getElement.eq(i).find('.detimg').attr('src', 'img/quick_sale/' + data[i].detimg + '_flag.jpg');
			$getElement.eq(i).find('.country').text(data[i].country);
			$getElement.eq(i).find('.dettime').text(data[i].dettime);
			$getElement.eq(i).find('.title01').text(data[i].title01);
			$getElement.eq(i).find('.title02').text(data[i].title02);
			$getElement.eq(i).find('.price').text(data[i].price);
			$getElement.eq(i).find('.delprice').text(data[i].delprice);
			$getElement.eq(i).find('.isinclude').text(data[i].isinclude);
			$getElement.eq(i).find('.num').text(data[i].num);
			// 倒计时的
			starttime = new Date('2020/6/8');
			var test = setInterval(countdown, 1000);
		}
	});


	$.getJSON('json/quick_sale_a.json', function(data) {
		var len = data.length;
		// 根据json文件的信息数量创建li
		for (i = 0; i < len; i++) {
			var newlist = creata();
			$('.today_down').append(newlist);
		}
		// 把json的数据添加进li中
		var $getElement = $('.today_down>.shop_card');
		for (i = 0; i < len; i++) {
			// 布局，把每行的第三盒子的右边距设为0
			if (i % 3 == 0) {
				$getElement.eq(i - 1).css('margin-right', '0');
			}
			$getElement.eq(i).find('.shopimg').attr('src', 'img/quick_sale/' + data[i].shopimg + '_350_350.jpg');
			$getElement.eq(i).find('.shopcountry').attr('src', 'img/quick_sale/' + data[i].shopcountry + '_flag.jpg');
			$getElement.eq(i).find('.isshoptitle').text(data[i].shoptitle);
			$getElement.eq(i).find('.shopprice').text(data[i].shopprice);
			$getElement.eq(i).find('.shopdel').text(data[i].shopdel);
			$getElement.eq(i).find('.shopget').text(data[i].shopget);
		}
	});


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
			$('.quick_time').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
		}
	}


});

// 创建今日卡片
function creattoday() {
	var newlist = '<div class="det_shop clearfix">' +
		'<div class="fl"><a href="goodsList.html" target="_blank"><img src="" alt=""></a></div>' +
		'<div class="fr">' +
		'<a href="goodsList.html" target="_blank">' +
		'<div class="det_top clearfix">' +
		'<img src="" class="detimg">' +
		'<span class="country"><br></span>' +
		'<p class="quick_time fr"></p>' +
		'<p class="dettime fr"></p>' +
		'</div>' +
		'<h4 class="title01"></h4>' +
		'<h4 class="title02"></h4>' +
		'<div class="sale">￥' +
		'<b class="price"></b>' +
		'<span class="delprice"></span>' +
		'<span class="isinclude"></span>' +
		'</div>' +
		'<p class="isspan"><span class="num"> </span>人已购买</p>' +
		'<div class="check_det"></div>' +
		'</a></div></div>';
	return newlist;
}

// 创建下边的小卡片
function creata() {
	var newlist = '<a href="detailPageone.html" target="_blank" class="shop_card">' +
		'<img src="" alt="" class="shopimg">' +
		'<img src="" alt="" class="shopcountry">' +
		'<p class="isshoptitle"></p>' +
		'<p class="jiage">￥<span class="shopprice"></span><span class="shopdel"></span></p>' +
		'<p><span class="shopget"></span>人已购买' +
		'<span class="quick_time fr">倒计时</span>' +
		'<span class="downtime fr">距离结束还剩</span>' +
		'</p></a>';
	return newlist;
}

// 
function creatlogin() {
	var newlist = '欢迎您，<a href="index.html" target="_blank" class="enter" id="userlogin">请登录</a>' +
		'[ ' +
		'<span class="enter" id="exit">退出</span>' +
		']';
	return newlist;
}
