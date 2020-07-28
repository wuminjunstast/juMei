$(function() {
	// 加载尾部
	$('#footer_simple').load('./footerShopCar.html');

	// 获得短信验证码
	var varify = false;
	// 是否点击了注册按钮
	var isregister = false;
	// 获取验证码之前的手机号，用于判断获取验证码之后手机号是否发生改变
	var statephone = '';
	// 登录表单的背景div的高度
	var $H = $('#contolH');

	// 初始化
	function reset() {
		// 获得短信验证码
		var varify = false;
		// 是否点击了注册按钮
		var isregister = false;
		// 获取验证码之前的手机号，用于判断获取验证码之后手机号是否发生改变
		var statephone = '';
	}

	// 点击"在此登录"，改变表单和背景图，初试化全局变量
	$('#tologin').click(function() {
		var $parents = $(this).parents('.register');
		$parents.css('display', 'none');
		$parents.next().css('display', 'block');
		$('#bgimg').addClass('trun');
		reset();
	});
	$('#toregister').click(function() {
		var $parent = $(this).parents('.login');
		$parent.css('display', 'none');
		$parent.prev('.register').css('display', 'block');
		$('#bgimg').removeClass('trun');
		reset();
	});

	// 添加登录页面的其他方式登录小图片
	var $login_a = $('.other_login a');
	var len_login = $login_a.length;
	for (var i = 0; i < len_login; i++) {
		if (i < 5) {
			var position = -56 * i;
			var a = 0;
		} else if (i < 7) {
			var position = -56 * (i - 5);
			var a = -53;
		} else {
			var position = -56 * (i - 4);
			var a = -53;
		}
		$login_a.eq(i).css('background-position', position + 'px ' + a + 'px');
	}


	//切换动态登录和普通登录
	$('.select_login').change(function() {
		reset();
		var radio = $('input:radio[name="logincheck"]:checked').val();
		var $form01 = $('#login01_form');
		var $form02 = $('#login02_form');
		var $child = $('#more').children();
		var $H = $('#contolH');
		if (radio == 1) {
			$form01.css('display', 'block');
			$form02.css('display', 'none');
			$H.height(380);
			$child.removeClass('more');
		} else {
			$form01.css('display', 'none');
			$form02.css('display', 'block');
			$H.height(470);
			$child.removeClass('more');
		}
	});

	// 滑块验证
	$('#drag').drag();

	// 点击获取短信验证码
	$('#getnote').click(function() {
		// 清空验证码框的样式
		$(this).siblings('p').css('display', 'none');
		$('#iptnote').removeClass('error');

		// 若手机号正确改变布尔值
		// 调用时传递的0代表注册状态，1代表动态密码登录状态，2代表普通登录状态
		var isnull = checkTel($('#tel'), 0);
		if (isnull == true) {
			// 获取手机号
			statephone = $('#tel').val();
			varify = true;
			$('#tel').siblings('p').css('display', 'none');
		}

		// 若获取到的手机号为空，提示输入手机号并清空验证码框
		var getphone = $('#tel').val();
		if (getphone == '') {
			$('#tel').siblings('p').eq(0).css('display', 'block');
			$('#tel').addClass('getfocus');
			$('#iptnote').val('');
		}
	});

	// 获取动态密码
	$('#getcode').click(function() {
		// 若手机号正确改变布尔值
		var isnull = checkTel($('#user'), 1);
		if (isnull == true) {
			// 获取手机号
			statephone = $('#user').val();
			varify = true;
		}
		// 若获取到的手机号为空，清空验证码框
		var getphone = $('#user').val();
		if (getphone == '') {
			$('#autocode').val('');
		}
	});

	// 获取验证码失败后，若手机号获取了焦点则把验证码的提示隐藏
	// 点击了注册，然后手机号获得焦点后验证码不隐藏提示
	$('#tel').focusin(function() {
		if (isregister == false) {
			$('#iptnote').siblings('p').css('display', 'none');
			$('#iptnote').removeClass('error');
		}
	});

	// 点击input，下方出现提示,出错后回到第一个温柔的提示内容
	var $ipt = $('input');
	$ipt.focusin(function() {
		var $getsib = $(this).siblings('p').eq(0);
		$getsib.css('display', 'block');
		$getsib.nextAll().css('display', 'none');
		$(this).removeClass('error').addClass('getfocus');
	});
	$ipt.focusout(function() {
		$(this).siblings('p').css('display', 'none');
		$(this).removeClass('getfocus');

		switch ($(this).attr('id')) {
			case 'tel':
				checkTel($('#tel'), 0);
				break;
			case 'iptnote':
				checkNote($('#iptnote'), 0);
				break;
			case 'pass01':
				checkPwd($('#pass01'), 0);
				break;
			case 'pass02':
				checkRepwd();
				break;
		}
	});

	// 点击提交按钮，所有的输入框进行验证，若是有一项不符合都不提交
	// 注册
	$('#register_form').submit(function(e) {
		e.preventDefault();
		isregister = true;
		var istel = checkTel($('#tel'), 0);
		var isnote = checkNote($('#iptnote'), 0);
		var ispwd = checkPwd($('#pass01'), 0);
		var isrepwd = checkRepwd();
		if (istel == false || isnote == false || ispwd == false || isrepwd == false) {
			return false;
		}
		userregister();
	});
	// 动态登录
	$('#login01_form').submit(function(e) {
		e.preventDefault();
		isregister = true;
		var istel = checkTel($('#user'), 1);
		var isnote = checkNote($('#autocode'), 1);
		if (istel == false || isnote == false) {
			return false;
		}
		userlogin('01');
	});
	// 普通登录
	$('#login02_form').submit(function(e) {
		// 阻止默认的跳转事件
		e.preventDefault();
		isregister = true;
		var istel = checkTel($('#person'), 2);
		var ispwd = checkPwd($('#password'), 1);
		var text = $('.drag_text').text();
		// 验证拖拽
		if (text != '验证通过') {
			$('#alertdrag').css('display', 'block').addClass('space');
			return false;
		} else {
			$('#alertdrag').css('display', 'none');
		}
		if (istel == false || ispwd == false) {
			return false;
		}
		userlogin('02');
	});

	// 点击更多
	$('#more').click(function() {
		// 修改背景的高度
		var h = $H.height();
		var $child = $(this).children();
		if (h < 475) {
			h += 70;
			$child.addClass('more');
		} else {
			h -= 70;
			$child.removeClass('more');
		}
		$H.height(h);
	});


	// 将json保存的用户信息数据提取
	function userlogin(road) {
		// 获取本地信息
		var obj = getlocal();

		// 对用户输入的信息进行处理
		if (road == '01') {
			var username = $('#user').val();
		} else {
			var username = $('#person').val();
			var password = $('#password').val();
		}

		// 判断是否有登录状态，若有则删除
		// if (obj.arr.length == 0) {
		// 	localStorage.clear();
		// }
		for (var i = 0; i < obj.arr.length; i++) {
			if (obj.arr[i].control != '') {
				obj.arr[i].control = '';
				obj.local.setItem('data', JSON.stringify(obj.arr));
			}
		}
		var objlogin = isexist(1, obj.arr, username);

		if (objlogin.state) {
			//如果存在相同账号
			// 如果自动登录复选框是选中状态，则把原本保存的密码赋值
			if ($('input[type="checkbox"]:checked')) {
				password = obj.arr[objlogin.order].password;
			}
			if (password == obj.arr[objlogin.order].password) {
				// 保存已登录的用户名
				obj.arr[objlogin.order].control = 'yes';
				obj.local.setItem('data', JSON.stringify(obj.arr));
				// console.log(storage);
				window.location.href = "index.html";
			} else {
				alert("密码错误");
			}
		} else {
			alert('用户不存在，请先注册');
		}
	}

	function userregister() {
		var obj = getlocal();

		// 对用户输入的信息进行处理
		var username = $('#tel').val();
		var password = $('#pass02').val();

		var objlogin = isexist('', obj.arr, username);
		if (objlogin) {
			alert('用户已存在，请前往登录页面');
		} else {
			// 创建一个新的用户对象
			var newuserObj = {
				"username": username,
				"password": password,
				"control": "",
				"shopcar": "",
				"order": ""
			};
			obj.arr.push(newuserObj);
			obj.local.setItem('data', JSON.stringify(obj.arr));
			window.location.href = "login.html";
		}
	}

	// 获取local
	function getlocal() {
		// 判断localStorage是否已保存有数据
		// localStorage.clear();

		if (localStorage.length == 1 && localStorage.getItem("data") != null) {
			var storage = window.localStorage;
		} else {
			localStorage.clear();
			// 若是没有则设置一个对象数据
			var data = [{
				"username": "17853680000",
				"password": "admin01",
				"control": "",
				"shopcar": "",
				"order": ""
			}, {
				"username": "17853680001",
				"password": "admin02",
				"control": "",
				"shopcar": "",
				"order": ""
			}];
			var storage = window.localStorage;
			// 把对象转换成字符串
			var d = JSON.stringify(data);
			// 把字符串存入localstorage
			storage.setItem("data", d);
		}
		// 现在不管怎样，localstorage里边一定是有数据的
		var json = storage.getItem("data");
		// 转换成对象使用
		var jsonObj = JSON.parse(json);
		// localStorage.clear();
		return {
			"local": storage,
			"arr": jsonObj
		}
	}

	// 是否存在该用户
	function isexist(a, arr, username) {
		var flag = false;
		var index = 0;

		//遍历数组匹配用户名
		for (var i = 0; i < arr.length; i++) {
			//判断是否有相同账号            
			if (username == arr[i].username) {
				//有这个账号  
				flag = true;
				index = i;
			}
		}
		if (a == '') {
			return flag;
		} else {
			return {
				"state": flag,
				"order": index
			}
		}
	}

	var regtel = /^[1][0-9]{10}$/;
	var regnote = /^[0-9]{6}$/;
	var regpwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z~!@#$%^&*]{6,16}$/;
	// 必须包含一个字母，一个数字
	var isinclude = /^(?![^a-zA-Z]+$)(?!\D+$)/;

	// 手机号
	function checkTel($send, a) {
		var send = $send.val();
		// 用户没有输入时不进行判断
		if (send != '') {
			if (regtel.test(send) == false) {
				isError($send);
				switch (a) {
					case '0':
						$('#iptnote').val('');
						break;
					case '1':
						$('#autocode').val('');
						break;
				}
				return false;
			} else {
				isRight($send);
				if (a == 0) {
					$send.after('<i>');
				}
				// 如果是点击注册按钮就不清空验证码
				if (isregister != true) {
					switch (a) {
						case '0':
							$('#iptnote').val('');
							break;
						case '1':
							$('#autocode').val('');
							break;
					}
				}
				return true;
			}
		} else {
			// 如果已经按了注册按钮，则在空的输入框下提示，并且修改注册的布尔值
			isNull($send);
			return false;
		}
	}

	// 验证码
	function checkNote($end, a) {
		var newphone = '';
		var send = $end.val();
		if (statephone != '') {
			switch (a) {
				case 0:
					newphone = $('#tel').val();
					break;
				case 1:
					newphone = $('#user').val();
					break;
			}
		}
		// 如果两个值相等则进行验证，否则提示点击验证码，清空验证码框，布尔值为false
		if (statephone == newphone) {
			// 用户没有输入时不进行判断
			if (send != '') {
				// 是否点击了获取验证码，若是没有则提示点击验证码
				if (varify == true) {
					if (regnote.test(send) == false) {
						isError($end);
						return false;
					} else {
						isRight($end);
						return true;
					}
				} else {
					isOtherError($end);
					return false;
				}
			} else {
				isNull($end);
				return false;
			}
		} else {
			isOtherError($end);
			$end.val('');
			varify = false;
			return false;
		}
	}

	// 验证密码  
	function checkPwd($send, a) {
		var pwd = $send.val();
		// var len = pwd.length;
		// 在普通登录状态下，若选中自动登录，不进行密码验证
		if (a = 1 && $('input[type="checkbox"]:checked')) {
			return true;
		}

		if (pwd != '') {
			// 判断时候吧包含一个字母，一个数字
			if (a == 0) {
				if (isinclude.test(pwd) == false) {
					isOtherError($send);
					return false;
				}
			}

			if (regpwd.test(pwd) == false) {
				isError($send);
				return false;
			} else {
				isRight($send);
				return true;
			}
		} else {
			isNull($send);
			return false;
		}
	}

	// 确认密码
	function checkRepwd() {
		var $repassword = $('#pass02');
		var pwd = $('#pass01').val();
		var repwd = $repassword.val();
		if (pwd != '' && repwd != '') {
			if (repwd != pwd) {
				isError($repassword);
				return false;
			} else {
				isRight($repassword);
				return true;
			}
		} else {
			isNull($repassword);
			return false;
		}
	}

	// 验证正确
	function isRight($right) {
		$right.siblings('p').css('display', 'none').removeClass('space');
	}

	// 验证错误
	function isError($error) {
		$error.siblings('p').eq(1).css('display', 'block').addClass('space');
		$error.addClass('error');
	}

	// 其他验证错误情况
	function isOtherError($othererror) {
		$othererror.siblings('p').eq(2).css('display', 'block').addClass('space');
		$othererror.addClass('error');
	}

	// 输入框为空
	function isNull($null) {
		if (isregister == true) {
			$null.siblings('p').eq(0).css('display', 'block');
			$null.addClass('getfocus');
			isregister = false;
		}
	}
});
