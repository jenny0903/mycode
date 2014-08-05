<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login</title>
<link href="/static/css/login.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/static/js/jquery-1.7.2.min.js"></script>
</head>


<body>
<!-- button01   <button class="button blue">Button Tag</button>  -->
<!-- button01
<div class="container">
<div class="login_bar">
    <a class="btn small_btn blue_btn register" href="javascript:;" >注册</a>
    <a class="btn small_btn blue_btn login" href="javascript:;" >登录</a>
    
</div>
</div>
-->

<div class="container">
	<div class="login_box">
    	<h1>登录</h1>
        <div class="login_list" >
        	<div class="input_box">
                <lable for="login_username" >用户名</lable>
                <input id="login_username" />
            </div>
            <div class="input_box">
                <lable for="login_password" >密码</lable>
                <input id="login_password" />
            </div>
            <p class="check_box">
           		<input id="remember_password" type="checkbox" />
            	<lable for="remember_password" >忘记密码</lable>
            </p>
            <p class="confirm">
            	<a class="login">登录</a>
            </p>
        </div>
	</div>
</div>

</body>
</html>
