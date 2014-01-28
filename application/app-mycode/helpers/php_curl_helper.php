<?php
header("Content-type: text/html; charset=utf-8");
session_start();

function login($username,$password){
	$curl = curl_init();
	// echo $username,$password;
	$url = "http://10.32.0.18:6868/admin/login?u=$username&p=$password";
	// echo $url;
	curl_setopt($curl, CURLOPT_URL, $url); 
	curl_setopt($curl, CURLOPT_HEADER, 1);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	$result = curl_exec($curl);
	preg_match('/Cookie:\s(_+)\w{4}(_+)=\w+(-)\w+(-)\w+(-)\w+(-)\w+/i', $result, $string);
	// var_dump($string);
	$cookie =  $string[0];
	// echo $cookie;
	$_SESSION['cookie'] = $cookie;
	// if(!isset($_SESSION['cookie'])){
        // $_SESSION['cookie'] = $cookie;
	// }
	// if(isset($_SESSION['cookie'])){
		 // echo 'You are Logged as '.$_SESSION['cookie'].'<br/>';
	// }
	if($result === false){
		return 0;
	}else{
		return 1;
	}
	curl_close($curl);
}

function getApi($url){
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url); 
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HTTPHEADER, Array($_SESSION['cookie']));
	$result = curl_exec($curl);
	$info = curl_getinfo($curl);
	curl_close($curl);
	return($result);
}


function getApi_info($url){
	$data = 0;
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url); 
	curl_setopt($curl, CURLOPT_HEADER, 0);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HTTPHEADER, Array($_SESSION['cookie']));
	$result = curl_exec($curl);
	$info = curl_getinfo($curl);
	if($info["http_code"] === 200){
		$data = 1;
	}else{
		$data = 0;
	}
    curl_close($curl);
	return $data;
}


function putApi($url,$put_data){
	$data = 0;
	$put_data = json_encode($put_data);  
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url); 
	curl_setopt($curl, CURLOPT_HEADER, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
	$aHeader[] = $_SESSION['cookie']; 
	$aHeader[] = 'Content-Type: application/json';
	curl_setopt($curl, CURLOPT_HTTPHEADER, $aHeader);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $put_data); 
	$result = curl_exec($curl);
	$info = curl_getinfo($curl);
	if($info["http_code"] === 200){
		$data = 1;
	}else{
		$data = 0;
	}
    curl_close($curl);
	return $data;
}

function postApi($url,$post_data){
	$data = 0;
	$post_data = json_encode($post_data);  
    $curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER,1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_POST, 1);  
	$aHeader[] = $_SESSION['cookie']; 
	$aHeader[] = 'Content-Type: application/json';
	curl_setopt($curl, CURLOPT_HTTPHEADER, $aHeader);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
	$result = curl_exec($curl);
	$info = curl_getinfo($curl);
	if($info["http_code"] === 200){
		$data = 1;
	}else{
		$data = 0;
	}
    curl_close($curl);
	return $data;
}

function deleteApi($url){
	$data = 0;
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, $url); 
	curl_setopt($curl, CURLOPT_HEADER, 1);
	curl_setopt($curl, CURLOPT_TIMEOUT, 30);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");  
	curl_setopt($curl, CURLOPT_HTTPHEADER, Array($_SESSION['cookie']));
	$result = curl_exec($curl);
	$info = curl_getinfo($curl);
	if($info["http_code"] === 200){
		$data = 1;
	}else{
		$data = 0;
	}
    curl_close($curl);
	return $data;
}

function setsession(){
	//如果会话没有被设置，查看是否设置了cookie
	if(!isset($_SESSION['cookie'])){
			$_SESSION['cookie'] = $cookie;
			//session_write_close(); //避免冲突
	}
	//使用一个会话变量检查登录状态
	if(isset($_SESSION['cookie'])){
		echo 'You are Logged as '.$_SESSION['cookie'].'<br/>';
	}
	/**在已登录页面中，可以利用用户的session如$_SESSION['username']、
	 * $_SESSION['user_id']对数据库进行查询，可以做好多好多事情*/
}

function clrsession(){
	if(isset($_SESSION['cookie'])){
		//要清除会话变量，将$_SESSION超级全局变量设置为一个空数组
		$_SESSION = array();
		//如果存在一个会话cookie，通过将到期时间设置为之前1个小时从而将其删除
		if(isset($_COOKIE[session_name()])){
			setcookie(session_name(),'',time()-3600);
		}
		//使用内置session_destroy()函数调用撤销会话
		session_destroy();
	}
	//同时将各个cookie的到期时间设为过去的某个时间，使它们由系统删除，时间以秒为单位
	setcookie('cookie','',time()-3600);
}

