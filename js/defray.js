$(function() {

	//选项卡：
	$(".box .title .item").click(function() {
		//获取索引
		var idx = $(this).index();

		//改变默认样式，首先把默认的删除掉，在清空所有的样式，然后，点击那个哪个添加class默认样式
		$(".box .title .item").removeClass("selected");
		$(".box .title .item").eq(idx).addClass("selected");
		//拿到索引让对应的页面展示
		$(".box .body .page").removeClass("selected");
		//选中哪个之后哪个就停留在默认样式上
		$(".box .body .page").eq(idx).addClass("selected");
	});

	//支付隐藏
	var $yincang = $(".container .box .body .page:last-child .neirong04 .zhifu01").eq(11).click(function() {
		$(this).css("display", "none")
		$(".yincang").css("display", "block");
		$(".container .box .body .page:last-child .neirong04").css("height", 500);
	})

	//右下角红色对号
	var $pic = $(".zhifu01_02").click(function() {
		$pic.removeClass("choose");
		$(this).addClass("choose");
	});

	//订单详情下拉菜单
	var flag = true;
	$(".container .floor2 .right .up .up02 .up02_01").click(function() {
		if (flag == true) {
			$(this).html("订单详情<img src='img/arrow_icon.png' >");
			flag = false;
			$(".container .floor2 .right .down ").css("display", "block");
		} else {
			$(this).html("订单详情<img src='img/down_arrow_icon.png' >");
			flag = true;
			$(".container .floor2 .right .down ").css("display", "none");
		}

	})


});
