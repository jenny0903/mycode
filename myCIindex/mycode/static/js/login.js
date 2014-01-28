var login = {
		flag: {
			username: false,
			password: false,
			loginbtn: false
		}
	};
function login_btn_check(){
	if(login.flag.username && login.flag.password){
		login.flag.loginbtn=true;
		$(".login_btn").removeClass('btn_disable');
	}else{
		login.flag.loginbtn=false;
		$(".login_btn").addClass('btn_disable');
	}
}
$('#login_username, #login_password').keydown(function(e){
	if( e.keyCode == 13 ){
		loginSubmit();
	}
});
$("#login_username").bind({
	keyup: function(){
		if($("#login_username").val()!=''){
			login.flag.username=true;
		}else{
			login.flag.username=false;
		}
		login_btn_check();
	},
	blur: function(){
		if($("#login_username").val()!=''){
			login.flag.username=true;
		}else{
			login.flag.username=false;
		}
		login_btn_check();
	}
});
$("#login_password").bind({
	keyup: function(){
		if($("#login_password").val()!=''){
			login.flag.password=true;
		}else{
			login.flag.password=false;
		}
		login_btn_check();
	},
	blur: function(){
		if($("#login_password").val()!=''){
			login.flag.password=true;
		}else{
			login.flag.password=false;
		}
		login_btn_check();
	}
});
$("#login_submit").click(function(){
	loginSubmit();
});
function loginSubmit(){
	login_btn_check();
	if(login.flag.loginbtn){
		if($("#J_loading_wrap").length==0){
			$('body').append(tpl.loading_box);
			$("#J_loading_wrap .loading_content").text('正在登录，请稍等……');
			$("#J_loading_wrap").show();
		}else{
			$("#J_loading_wrap .loading_content").text('正在登录，请稍等……');
			$("#J_loading_wrap").show();
		}
		$.ajax({
			type: "POST",
			url: ajax_main_path+'libs/controller/login.php',
			data:"username="+$("#login_username").val()+"&password="+$("#login_password").val(),
			success: function(data){
				if( data == '1' ||  data == 1){
					$("#J_loading_wrap").hide();
					window.location.href='main.php';
				}else{
					$("#J_loading_wrap").hide();
					if($("#J_alert_wrap").length==0){
						$('body').append(tpl.alert_box);
						$("#J_alert_wrap .alert_content").text('登录失败，请重试！');
						$("#J_alert_wrap").show();
					}else{
						$("#J_alert_wrap .alert_content").text('登录失败，请重试！');
						$("#J_alert_wrap").show();							
					}
					setTimeout(hideAlert, 1000);
				}
			}
		});
	}
};
function hideAlert(){
	$("#J_alert_wrap").hide();
};