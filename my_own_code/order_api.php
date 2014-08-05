<?php
$url = "https://10.32.33.2:443/3.0/user/upgrade";
$token = "amKmnWePzBLJitM8YCOKkJnOQAmqMvpX";
$cookie = 'Authorization: Bearer '.$token;
$post_data = array(
	"role" => "unpaid"
);
$post_data = json_encode($post_data); 
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);                  
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);    
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);      
curl_setopt($curl, CURLOPT_USERAGENT, 'yunio/3.0');			
curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求 
curl_setopt($curl, CURLOPT_HTTPHEADER, Array($cookie));	
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);// Post提交的数据包      
curl_setopt($curl, CURLOPT_TIMEOUT, 30);     
curl_setopt($curl, CURLOPT_HEADER, 0);     
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
curl_exec($curl);			
$result = curl_exec($curl);
$info = curl_getinfo($curl);	

var_dump($info);
echo $result;


?>