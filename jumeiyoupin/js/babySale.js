$(function() {

	// 加载公共部分
	$('#header').load('./header.html');
	$.getScript('js/header.js');
	$('#rightmenu').load('./rightmenu.html');
	$.getScript('js/rightmenu.js');
	$('#footer').load('./footer.html');
	$.getScript('js/footer.js');




	// 生成每日必看卡片,读取json的数据
	$.getJSON('json/babysale.json', function(data) {
		var len = data.length;
		// 根据json文件的信息数量创建a
		for (i = 0; i < len; i++) {
			var newlist = creatleft();
			$('#a_list').append(newlist);
		}
		// 把json的数据添加进a中
		var $getElement = $('.bg #a_list>a');
		for (i = 0; i < len; i++) {
			$getElement.eq(i).find('.logo>img').attr('src', 'img/babysale/' + data[i].loginimg + '.jpg');
			$getElement.eq(i).find('.fl>h5').text(data[i].special);
			$getElement.eq(i).find('.sctive').text(data[i].active);
			$getElement.eq(i).find('.time').text(data[i].time);
			$getElement.eq(i).find('.fl>img').attr('src', 'img/babysale/' + data[i].img + '_500_245.jpg');
			$getElement.eq(i).find('.float_text').text(data[i].slogan);
		}
	});

	$.getJSON('json/babysale_foreshow.json', function(data) {
		var len = data.length;
		// 根据json文件的信息数量创建a
		if (len > 6) {
			len = 6
		}
		for (i = 0; i < len; i++) {
			var newlist = creatli();
			$('#foreshow').append(newlist);
		}
		// 把json的数据添加进a中
		var $getElement = $('.bg #foreshow>li');
		for (i = 0; i < len; i++) {
			$getElement.eq(i).find('.thum').attr('src', 'img/' + data[i].imgurl + '.jpg');
			$getElement.eq(i).find('.maximg>img').attr('src', 'img/' + data[i].delimg + '_310_200.jpg');
			$getElement.eq(i).find('.p1').text(data[i].tebie);
			$getElement.eq(i).find('.p2').text(data[i].act);
		}
	});

	$.getJSON('json/babysale_next.json', function(data) {
		var len = data.length;
		console.log(len);
		// 创建即将开售的卡片
		for (i = 0; i < len; i++) {
			var newlist = creatcard();
			$('.nextsale_box').append(newlist);
		}
		
		var $getElement = $('.nextsale_box .nextsale_content');
		for (i = 0; i < len; i++) {
			console.log($getElement);
			// 即将开售的布局处理
			if (i % 3 == 0) {
				$getElement.eq(i - 1).css('margin-right', '0');
			}
			$getElement.eq(i).find('.mainimg').attr('src', 'img/babysale/' + data[i].mainimg + '_310_200.jpg');
			$getElement.eq(i).find('.logoimg').attr('src', 'img/babysale/' + data[i].logoimg + '.jpg');
			$getElement.eq(i).find('.next_act').text(data[i].next_act);
			$getElement.eq(i).find('.next_ad').text(data[i].next_ad);
		}
	});


	// 左侧卡片效果
	$a_list = $('#a_list');
	$a_list.on('mouseover', '.content_left_bg', function() {
		$(this).children('.cover').css('display', 'block');
	});
	$a_list.on('mouseout', '.content_left_bg', function() {
		$(this).children('.cover').css('display', 'none');
	});


	// 右侧卡片效果
	$foreshow = $('#foreshow');
	$foreshow.on('mouseover', 'li', function() {
		$(this).find('.maximg').css('display', 'block');
		$(this).siblings().find('.maximg').css('display', 'none');
	});
	$foreshow.on('mouseout', 'li', function() {
		$(this).find('.maximg').css('display', 'none');
		$(this).siblings().find('.maximg').css('display', 'black');
	});

	var starttime = new Date('2020/5/28');
	var test = setInterval(countdown, 1000);

	// 倒计时效果
	function countdown() {
		var nowtime = new Date();
		var time = starttime - nowtime;
		var day = parseInt(time / 1000 / 60 / 60 / 24);
		var hour = parseInt(time / 1000 / 60 / 60 % 24);
		var minute = parseInt(time / 1000 / 60 % 60);
		var seconds = parseInt(time / 1000 % 60);
		$('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
	}
});

function creatleft() {
	var newlist = '<a class="content_left_bg clearfix" href="detailPageOne.html" target="_blank">' +
		'<div class="fl">' +
		'<p class="logo"><img src=""></p>' +
		'<h5></h5>' +
		'<h6 class="sctive"></h6>' +
		'<h6 class="time"></h6>' +
		'</div>' +
		'<div class="fl"><img src=""><span></span></div>' +
		'<div><span class="float_text"></span><span class="timespan"></span><span>剩余</span></div>' +
		'<div class="cover"></div>' +
		'</a>';
	return newlist;
}

function creatli() {
	var newlist = '<li>' +
		'<img src="" class="thum">' +
		'<div class="maximg"><img src=""><p class="p1"></p><p class="p2"></p></div>' +
		'</li>';
	return newlist;
}

function creatcard() {
	var newlist = '<div class="nextsale_content">' +
		'<a href="index.html" target="_blank">' +
		'<img src="" alt="" class="mainimg"><img src="" alt="" class="logoimg">' +
		'<span class="next_act"></span>' +
		'<p class="next_ad"></p>' +
		'</a></div>';
	return newlist;
}