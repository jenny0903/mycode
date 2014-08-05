var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
	52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
	15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
//var setdomain = domain.base.substr(1);
function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while(i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if(i == len)
		{
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if(i == len)
		{
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
};
function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while(i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while(i < len && c1 == -1);
		if(c1 == -1)
			break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while(i < len && c2 == -1);
		if(c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if(c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		} while(i < len && c3 == -1);
		if(c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if(c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		} while(i < len && c4 == -1);
		if(c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
};
var yunio_validate = {
	flag: {
		nickname: false,
		email: false,
		password: false,
		tos: true,
		regbtn: false,
		loginemail: false,
		loginpassword: false,
		loginbtn: false
	},
	nickname: function(elem){
		if( !Core.validate.nickname( elem.val() ) ){
			this.flag.nickname = false;
			elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
			elem.parents('.m_reg_list').addClass('reg_error');
			elem.parents('.m_input_box').next().html( Core.validate.message ).removeClass('hidden');
			return false;
		}
		elem.next().removeClass('icon_mini_closemark').addClass('icon_mini_checkmark');
		elem.parents('.m_reg_list').removeClass('reg_error');
		elem.parents('.m_input_box').next().html('').addClass('hidden');
		this.flag.nickname = true;
		return true;
	},
	email: function(elem){
		if( !Core.validate.email( elem.val() ) ){
			if( elem.attr('id') == 'login_username' ){
				this.flag.loginemail = false;
			}else{
				this.flag.email = false;
			}
			elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
			elem.parents('.m_reg_list').addClass('reg_error');
			elem.parents('.m_input_box').next().html( Core.validate.message ).removeClass('hidden');
			return false;
		}
		elem.next().removeClass('icon_mini_closemark').addClass('icon_mini_checkmark').show();
		elem.parents('.m_reg_list').removeClass('reg_error');
		elem.parents('.m_input_box').next().html('').addClass('hidden');
		if( elem.attr('id') == 'login_username' ){
			this.flag.loginemail = true;
		}else{
			this.flag.email = true;
		}
		return true;
	},
	password: function(elem){
		//$('.mod_reg_box .alert_error').addClass('hidden');
		if( !Core.validate.password( elem.val() ) ){
			if( elem.attr('id') == 'login_password' ){
				this.flag.loginpassword = false;
			}else{
				this.flag.password = false;
			}
			elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
			elem.parents('.m_reg_list').addClass("reg_error");
			elem.parents('.m_input_box').next().html( Core.validate.message ).removeClass('hidden');
			return false;
		}
		if( elem.attr('id') == 'register_password' ){
			if( !Core.validate.password_check_dangerious( elem.val() ) ){
				this.flag.password = false;
				elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
				elem.parents('.m_reg_list').addClass("reg_error");
				elem.parents('.m_input_box').next().html( Core.validate.message ).removeClass('hidden');
				return false;
			}
		}
		elem.next().removeClass('icon_mini_closemark').addClass('icon_mini_checkmark').show();
		elem.parents('.m_reg_list').removeClass('reg_error');
		elem.parents('.m_input_box').next().html('').addClass('hidden');
		if( elem.attr('id') == 'login_password' ){
			this.flag.loginpassword = true;
		}else{
			this.flag.password = true;
		}
		return true;
	},
	loading: [
		'<div id="J_loading" class="mod_loading">',
			//'<span><img src="/static/images/loading.gif" />'+ language_common.c052 +'</span>',
			'<span><img src="/static/images/loading.gif" />'+ "正在加载中" +'</span>',
		'</div>'
	].join('')
};
var yunio_fast_register = {
	posting : false,
	flag : {u:false,m:false,p:false,a:false},
	check_username: function(){
		var elem = $('#register_username');
		$('.mod_reg_box .alert_error').addClass('hidden');
		if( !yunio_validate.nickname( elem ) ){
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
			return false;
		}
		elem.next().removeClass('icon_mini_closemark').addClass('icon_mini_checkmark').show();
		if( yunio_validate.flag.email == true && yunio_validate.flag.password == true && yunio_validate.flag.tos == true ){
			$('#J_reg_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
		}
	},
	check_mail: function(){
		$("#register_mail").val($("#register_mail").val().replace(/(^\s*)|(\s*$)/g, ""));
		var _this = this,
			elem = $("#register_mail");
		$('.mod_reg_box .alert_error').addClass('hidden');
		if ( !yunio_validate.email( elem )){
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			return false;
		}
		$.ajax({
			type: "POST",
			url: "/account/checkemail",
			data:"email="+encodeURIComponent(elem.val().toLowerCase()),
			dataType: 'json',
			async: false, 
			success: function(data){
				if( data == '1' ){
					yunio_validate.flag.email = true;
					elem.parent().removeClass("reg_error");
					elem.next().removeClass('icon_mini_closemark').addClass('icon_mini_checkmark').show();
				}else if( data == '0' ){
					yunio_validate.flag.email = false;
					elem.parents('.m_reg_list').addClass("reg_error");
					elem.parents('.m_input_box').next().html( language_common.c062 ).removeClass('hidden');
					elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
					return false;
				}else{
					elem.parents('.m_input_box').next().html( language_common.c043 ).removeClass('hidden');
					elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
				}
			}
		});
		if( yunio_validate.flag.nickname == true && yunio_validate.flag.password == true && yunio_validate.flag.tos == true ){
			$('#J_reg_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
		}else{
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
		}
	},
	check_password: function(){
		var elem = $("#register_password");
		$('.mod_reg_box .alert_error').addClass('hidden');
		if( !yunio_validate.password( elem ) ){ 
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			elem.next().removeClass('icon_mini_checkmark').addClass('icon_mini_closemark').show();
			return false;
		};
		elem.next().removeClass('icon_mini_closemark').addClass('icon_mini_checkmark').show();
		if( yunio_validate.flag.nickname == true && yunio_validate.flag.email == true && yunio_validate.flag.tos == true ){
			$('#J_reg_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
			return false;
		}else{
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
		}
	},
	check_checkbox: function(){
		if( $('#tos').attr('checked') == 'checked' ){
			yunio_validate.flag.tos = true;
			if( yunio_validate.flag.nickname == true && yunio_validate.flag.email == true && yunio_validate.flag.password == true ){
				$('#J_reg_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
			}else{
				$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			}
		}else{
			yunio_validate.flag.tos = false;
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			return false;
		}
	},
	register_submit: function(type){
		if(!yunio_validate.flag.nickname || !yunio_validate.flag.email || !yunio_validate.flag.password || !yunio_validate.flag.tos ){
			return false;
		}else{
			if( $('#J_loading').length == 0  ){
				$('#J_reg').append(yunio_validate.loading);
			}else{
				$('#J_loading').show();
			}
			// $.blockUI({
				// css: {
					// width: 380,
					// top: '50%',
					// left: '50%',
					// margin: '-70px 0 0 -200px'
				// },
				// message: '<div class="blockMessage">'+ language_common.c052 +'</div>',
				// showOverlay: true,
				// close: false
			// });
			if( yunio_fast_register.posting == true ){
				return false;
			}
			yunio_fast_register.posting = true;
			$('#J_reg_btn').addClass('btn_color_blue_disabled');
			var posturl = '/account/signup';
			var postaccount = $('#register_mail').val();
			var data_content = "alias=" + encodeURIComponent($('#register_username').val()) + "&password=" + encodeURIComponent(Util.addslashes($('#register_password').val())) + "&email=" + encodeURIComponent($('#register_mail').val().toLowerCase()) + "&mobile=''";
			if( type == 'oauth' ){
				//posturl ='/oauth/signup';
				data_content = "alias=" + encodeURIComponent($('#register_username').val()) + "&password=" + encodeURIComponent(Util.addslashes($('#register_password').val())) + "&email=" + encodeURIComponent($('#register_mail').val().toLowerCase()) + "&mobile=''"+ "&provider=" + $('#provider').val() + "&uid=" + $('#uid').val();
			}
			$.ajax({
				type: "POST",
				url: posturl,
				dataType: 'json',
				data: data_content,
				success: function(data){
					if(data == "1"){
						// window.location.href = "/account/verify_email";
						$.cookie('rememberUser', 'false', { expires: -1, path:'/', domain:setdomain, secure:''});
						$.cookie('username', postaccount,{ expires: 365, path:'/', domain:setdomain, secure:'' });
						//$.cookie('password', '', { expires: -1, path:'/', domain:setdomain, secure:'' });
						window.location.href = '/files';
						//$.unblockUI();
					}else if( data == "0" ){
						$.blockUI({
							css: {
								width: 380,
								top: '50%',
								left: '50%',
								margin: '-70px 0 0 -200px'
							},
							message: '<div class="blockMessage">'+language_common.c043+'</div>',
							showOverlay: true,
							close: false
						});
						$('#J_loading').hide();
						$('#J_reg_btn').removeClass('btn_color_blue_disabled');
						setTimeout($.unblockUI, 1000);
					}
					yunio_fast_register.posting = false;
				}
			});
		}
	},
	YunioEncodeAjaxChar: function(s){
		s = s.replace(/\|/g,'|YUNIO01|');
		s = s.replace(/\"/g,'|YUNIO02|').replace(/\'/g,'|YUNIO03|').replace(/\//g,'|YUNIO04|').replace(/\+/g,'|YUNIO05|').replace(/\&/g,'|YUNIO06|').replace(/\\/g,'|YUNIO07|');
		return s;
	}
};
$('#tos').click(function(){
	yunio_fast_register.check_checkbox();
});
$('#login_username').blur(function(){
	$("#login_username").val($("#login_username").val().replace(/(^\s*)|(\s*$)/g, ""));
	$('.mod_login_box .alert_error').addClass('hidden');
	if( !yunio_validate.email( $(this) ) ){
		$('#J_login_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
		return false;
	}
	if( yunio_validate.flag.loginpassword == true ){
		yunio_validate.flag.loginbtn = true;
		$('#J_login_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
	}else{
		yunio_validate.flag.loginbtn = false;
		$('#J_login_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
	}
});
$('#login_password').bind({
	keyup : function(){
		if( $(this).val().length < 6 ){
			yunio_validate.flag.loginbtn = false;
			$('#J_login_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			return false;
		}
		if( yunio_validate.password( $(this) ) && ( yunio_validate.flag.loginemail == true ) ){
			yunio_validate.flag.loginbtn = true;
			$('#J_login_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
		}else{
			yunio_validate.flag.loginbtn = false;
			$('#J_login_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
		}
	},
	blur : function(){
		$('.mod_login_box .alert_error').addClass('hidden');
		if( !yunio_validate.password( $(this) ) ){
			$('#J_login_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			return false;
		}
		if( yunio_validate.flag.loginemail == true ){
			yunio_validate.flag.loginbtn = true;
			$('#J_login_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
		}else{
			yunio_validate.flag.loginbtn = false;
			$('#J_login_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
		}
	}
});
/*$('#J_login_btn').click(function(){
	yunio_fast_login.login_submit();
});*/
var yunio_fast_login = {
	posting : false,
	login_submit : function(type){
		var account = $('#login_username'),
			password = $('#login_password'),
			postaccount = account.val(),
			postpassword = password.val();
		if( !yunio_validate.flag.loginemail || !yunio_validate.flag.loginpassword ){
			return false;
		}
		if( $('#J_loading').length == 0  ){
			$('#J_log').append(yunio_validate.loading);
		}else{
			$('#J_loading').show();
		}
		if( yunio_fast_login.posting == true ){
			return false;
		}
		yunio_fast_login.posting = true;
		$('#J_login_btn').addClass('btn_color_blue_disabled');
		if ( $('#J_remember_password').attr('checked') == 'checked' ){
			$.cookie('rememberUser', 'true',{ expires: 365, path:'/', domain:setdomain, secure:'' });
			$.cookie('username', postaccount,{ expires: 365, path:'/', domain:setdomain, secure:'' });
			//$.cookie('password', base64encode(postpassword),{ expires: 365, path:'/', domain:setdomain, secure:'' });
			// $.cookie('rememberUser', 'true',{ expires: 365, path:'/', domain:'.testyun.io', secure:'' });
			// $.cookie('username', postaccount,{ expires: 365, path:'/', domain:'.testyun.io', secure:'' });
			// $.cookie('password', base64encode(postpassword),{ expires: 365, path:'/', domain:'.testyun.io', secure:'' });
		}else {
			$.cookie('rememberUser', 'false', { expires: -1, path:'/', domain:setdomain, secure:''});
			$.cookie('username', postaccount,{ expires: 365, path:'/', domain:setdomain, secure:'' });
			//$.cookie('password', '', { expires: -1, path:'/', domain:setdomain, secure:'' });
			// $.cookie('rememberUser', 'false', { expires: -1, path:'/', domain:'.testyun.io', secure:''});
			// $.cookie('username', postaccount,{ expires: 365, path:'/', domain:'.testyun.io', secure:'' });
			// $.cookie('password', '', { expires: -1, path:'/', domain:'.testyun.io', secure:'' });
		}
		var posturl = '/account/signin';
		var data_content = "email=" + encodeURIComponent(postaccount) + "&password=" + encodeURIComponent(Util.addslashes(postpassword)) + "&flag=" + ( $('#J_remember_password').attr('checked') == 'checked' ? 1 : 0 );
		if( type == 'oauth' ){
			posturl ='/account/bind_account';
			data_content = "email=" + encodeURIComponent(postaccount) + "&password=" + encodeURIComponent(Util.addslashes(postpassword)) + "&flag=" + ( $('#J_remember_password').attr('checked') == 'checked' ? 1 : 0 ) + "&provider=" + $('#provider').val() + "&uid=" + $('#uid').val();
		}
		$.ajax({
			type: "POST",
			url: posturl,
			dataType: 'json',
			data: data_content ,
			success: function(data){
				switch( data ){
					case 1:
						$.unblockUI();
						window.location.href = '/files';
						break;
					case -1:
						$.blockUI({
							css: {
								width: 380,
								top: '50%',
								left: '50%',
								margin: '-70px 0 0 -200px'
							},
							message: '<div class="blockMessage text_left">'+language_common.c043+'</div>',
							showOverlay: true,
							close: false
						});
						setTimeout($.unblockUI, 1000);
						$('#J_login_btn').removeClass('btn_color_blue_disabled');
						break;
					
					case 400: //密码错误
						$.blockUI({
							css: {
								width: 380,
								top: '50%',
								left: '50%',
								margin: '-70px 0 0 -200px'
							},
							message: '<div class="blockMessage text_left">'+language_common.c065+'</div>',
							showOverlay: true,
							close: false
						});
						setTimeout($.unblockUI, 1000);
						$('#J_login_btn').removeClass('btn_color_blue_disabled');
						break;
					
					case 404: //没有这个用户
						$.blockUI({
							css: {
								width: 380,
								top: '50%',
								left: '50%',
								margin: '-70px 0 0 -200px'
							},
							message: '<div class="blockMessage text_left">'+language_common.c064+'</div>',
							showOverlay: true,
							close: false
						});
						setTimeout($.unblockUI, 1000);
						$('#J_login_btn').removeClass('btn_color_blue_disabled');
						break;
					
					default:
						$.blockUI({
							css: {
								width: 380,
								top: '50%',
								left: '50%',
								margin: '-70px 0 0 -200px'
							},
							message: '<div class="blockMessage text_left">'+language_common.c043+'</div>',
							showOverlay: true,
							close: false
						});
						setTimeout($.unblockUI, 1000);
						$('#J_login_btn').removeClass('btn_color_blue_disabled');
						
				};
				$('#J_loading').hide();
				yunio_fast_login.posting = false;
			}
		});
	}
};
var reg_root = $('#J_reg');
var log_root = $('#J_log');
//reg_root.find('.login_common').live('click',function(e){
reg_root.find('.login_common').click(function(e){
	reg_root.hide();
	log_root.show();
	reg_root.find('.mod_reg_box').hide();
	log_root.find('.mod_login_box').show();
	e.preventDefault();
});
log_root.find('.reg_common').click(function(e){
	reg_root.show();
	log_root.hide();
	log_root.find('.mod_login_box').hide();
	reg_root.find('.mod_reg_box').show();
	e.preventDefault();
});
reg_root.find('#J_login_other').live('click',function(){
	reg_root.find('.mod_reg_handle').hide();
	log_root.find('.mod_login_box').show();
});
reg_root.find('.m_input_txt').live({
	keydown : function(){
	//focus : function(){
		$(this).prev().hide();
	},
	blur: function(){
		if( $(this).val() == '' ){
			$(this).prev().show();
		}
	}
});
log_root.find('.m_input_txt').live({
	keydown : function(){
	//focus : function(){
		$(this).prev().hide();
	},
	blur: function(){
		if( $(this).val() == '' ){
			$(this).prev().show();
		}
	}
});
$('#register_password').bind({
	keyup : function(){
		if( $(this).val().length < 6 ){
			yunio_validate.flag.regbtn = false;
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
			return false;
		}
		if( yunio_validate.password( $(this) ) && ( yunio_validate.flag.nickname == true ) && ( yunio_validate.flag.email == true ) && ( yunio_validate.flag.tos == true ) ){
			yunio_validate.flag.regbtn = true;
			$('#J_reg_btn').removeClass('btn_color_blue_disabled').addClass('btn_color_blue');
		}else{
			yunio_validate.flag.regbtn = false;
			$('#J_reg_btn').removeClass('btn_color_blue').addClass('btn_color_blue_disabled');
		}
	},
	blur : function(){
		$('.mod_reg_box .alert_error').addClass('hidden');
		yunio_validate.password($(this));
	}
});
$('.mod_reg_form #register_username,.mod_reg_form #register_mail,.mod_reg_form #register_password,.mod_reg_form #tos').keydown(function(e){
	if( e.keyCode == 13 ){
	   yunio_fast_register.register_submit();
	}
});
$('.mod_auth_success #register_username,.mod_auth_success #register_mail,.mod_auth_success #register_password,.mod_auth_success #tos').keydown(function(e){
	if( e.keyCode == 13 ){
	   yunio_fast_register.register_submit('oauth');
	}
});  
$('.mod_reg_form #login_username,.mod_reg_form #login_password,.mod_reg_form #J_remember_password').keydown(function(e){
	if( e.keyCode == 13 ){
	   yunio_fast_login.login_submit();
	}
});
$('.mod_auth_success #login_username,.mod_auth_success #login_password,.mod_auth_success #J_remember_password').keydown(function(e){
	if( e.keyCode == 13 ){
	   yunio_fast_login.login_submit('oauth');
	}
});
function J_log(elem){
	var _this=$(elem),
		type=_this.attr('data');
	var post_data;
	switch(type){
		case 'weibo':
			post_data="op=1";
			break;
		case 'qq':
			//post_data="op=3";
			post_data="op=qq";
			break;
		case 'douban':
			post_data="op=4";
			break;
	}
	$.ajax({
		type: "POST",
		url: "/auth/abc",
		data: post_data,
		dataType: 'json',
		async: false,
		success:function(data){
				return true;
		}
	});
	switch(type){
		case 'weibo':
			_this.attr({'href':'https://api.weibo.com/oauth2/authorize?client_id=2655359650&response_type=code&redirect_uri=http://3.yunio.com/auth/sina','target':"_blank"});
			break;
		case 'qq':
			_this.attr({'href':'https://graph.qq.com/oauth2.0/authorize?client_id=100498331&response_type=code&redirect_uri=http%3A%2F%2F3.yunio.com&state=t','target':"_blank"});
			break;
		case 'douban':
			_this.attr({'href':'http://web1.testyun.io:8001','target':"_blank"});
			break;
	}
};
