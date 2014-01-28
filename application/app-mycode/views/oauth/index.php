	<div class="login_wrap">
    	<h1>登录</h1>
        <div class="input_wrap input_alert">
        	<label for="login_username">用户名</label>
            <input id="login_username" value="" type="text"  autocomplete="off" />
        </div>
        <div class="input_wrap">
        	<label for="login_password">密码</label>
            <input id="login_password" value="" type="password"  autocomplete="off" />
        </div>
		<!-- btn_disable -->
        <a class="btn login_btn btn_disable" href="javascript:;" id="login_submit">登录</a>
		<a data="weibo" onclick="J_log(this);" href="javascript:;">
			<i class="icon_mini icon_mini_weibo"></i>
			新浪微博
		</a>
    </div>
<script type="text/javascript" src="../static/js/login.js"></script>
