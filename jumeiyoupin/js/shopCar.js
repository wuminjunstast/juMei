$(function() {
	$('#header').load('headerCar.html');
	$.getScript('js/header.js');
	$('#footer').load('footerShopCar.html');
	//从购物车取数据
	// localStorage.clear();
	var cart = localStorage.getItem('data');
	cart = JSON.parse(cart);
	
	//用户是否登录
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
	if(cart != null) {
		// console.log('aaa');
		for(var i = 0; i < cart[index].shopcar.length; i++) {
			var productitem = cart[index].shopcar[i];
			var newtr = $('.cart-item-tr .cart_item').clone();
			newtr.find('.cart_link').text(productitem.title);
			newtr.find('.jumeiprice').text(productitem.price);
			newtr.find('.cart_amount').val(productitem.amount);
			newtr.find('.cart_xj').text(productitem.price * productitem.amount);
			newtr.find('.sku_info').text(productitem.color);
			newtr.find('.photo').attr('src', 'img/index/' + productitem.imgurl + '_dx_1000_400.jpg');
			$('#carttbl tbody tr:last').after(newtr);

		}
	}
	
	//20分钟支付倒计时
	var countdown = $('.group_show');
	var time = 1200;
	function djx(){
		time = time - 1;
		var minute = parseInt(time/60);
		var second = parseInt(time%60);
		$('.time_go').text('请在'+ minute + '分' + second + '秒内付款');
		if(minute == 0 && second == 0){
			$('.time_out').css('display','inline-block');
			$('.time_go').css('display','none');
		}
		
	};
	setInterval(djx,1000);
	//删除按钮
	var $del = $('.shanchu');
	$del.click(function(){
	var sc = $(this).parent().parent().parent();
		sc.remove();
		liebiao();
		price();
	})
	
	$('.jia').click(function() {
		var text = $(this).prev().val();
		var num = parseInt(text) + 1;
		if (num > 99) {
			alert('您购买的太多啦');
		} else {
			$(this).prev().val(num);
		}
		xj();
		price();
		
	});
	//减
	$('.jian').click(function() {
		var text = $(this).next().val();
		var num = parseInt(text) - 1;
		if (num < 1) {
			alert('输入错误！');
		} else {
			$(this).next().val(num);
		}
		xj();
		price();
	});
	//全部选择
		var j = false;
	$('.all_selector').click(function(){
		if(j == false){
			$('.cart_input').prop('checked',true);
			j = true;
			price();
		}else {
			$('.cart_input').prop('checked',false);
			j = false;
			$('.group_total_price,.total_price').text(0);
			$('.total_amount').text(0);
			
		};
	});
	//清空商品
	$('.clear_all').click(function(){
		$('.cart_input').each(function(){
			var $checked = $(this).prop('checked');
			if($checked = true){
				$(this).parent().parent().parent().remove();
				price();
			}
		});
		liebiao();
	});
	//商品为空则显示文字
	function liebiao(){
		var num = $('.cart_item').length;
		if(num <= 1){
			$('.cart_null').css('display','block');
			// console.log(num);
		};
		
	};
	liebiao();
	//小计计算
	function xj(){
		$('.cart_xj').each(function(){
		var num = parseInt($(this).parent().prev().find('.cart_item_num input').val());
		var xjnum = parseInt($(this).parent().siblings().find('.jumeiprice').text());
		var xjitem = num * xjnum;
		$(this).text(xjitem);
		// console.log(xjitem);
		});
	};
	//单选
	var $xuanze = $('.cart_input');
	$xuanze.click(function(){
		var $xzitem = $(this).prop('checked');
		if($xzitem == true){
			price();
		}else{
			price();
		};
		
	});
	//输入文本框
	function title(){
		var wenben = $('.cart_amount').val();
		if(wenben > 99){
			alert('您购买的太多了哦');
		}
		xj();
	};
	//总额
	function price(){
		var num = $('.cart_item').length - 1;
		var total = 0;
		var cartname = $('.cart_link').text();
		var cartnum = $('.cart_amount').val();
		$('.cart_input').each(function(){
			var checked = $(this).prop('checked');
			var money = parseFloat($(this).parent().parent().siblings().find('.cart_xj').text());
			if(checked == true){
			 total += money; 
			}
			// console.log(money);
			$('.group_total_price,.total_price').text(total);
			$('.total_amount').text(num);
		});
		localStorage.setItem('cartname',cartname);
		localStorage.setItem('cartnum',cartnum);
		localStorage.setItem('num',total);
	}
})
