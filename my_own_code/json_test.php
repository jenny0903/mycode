<?php

header("Content-Type: text/html;charset=utf-8");

$info = 200;

$result = '{"limit":100,"next":"","entries":[{"info":{"crc32":1640451987,"mime_type":"text/plain","has_thumb":false,"name":"3方协议领取通知.txt","parent":"/常用","user_id":"f2c23318-f8f4-421b-bf59-766eea9b0a0f"},"has_link":false,"meta_id":"17f6e334-684c-4790-b324-059a0789a21f","offset_hash_ctx":"","offset":39,"committer":"f2c23318-f8f4-421b-bf59-766eea9b0a0f","device":"Eleven-PC","status":"active","mod_date":"2013-10-21T03:15:31Z","create_date":"2013-10-21T03:15:31Z","hash":"7cd16d3878e85b06d7c8fdd53f1d5ad0f5b7e308","digest_alg":"sha1","size":39,"type_ver":1,"type":"file","rev":1382325331287089,"id":"a4490bff-995a-4da4-9daa-272132d061ac"},{"info":{"crc32":1474569193,"mime_type":"image/jpeg","has_thumb":true,"name":"IMG083_mh000.jpg","parent":"/常用","user_id":"f2c23318-f8f4-421b-bf59-766eea9b0a0f"},"has_link":true,"meta_id":"69557215-0f09-40ce-9ff6-1da6e0a65c7e","offset_hash_ctx":"","offset":260902,"committer":"f2c23318-f8f4-421b-bf59-766eea9b0a0f","device":"web","status":"active","mod_date":"2013-10-29T13:19:01Z","create_date":"2013-10-29T13:19:01Z","hash":"a3244a0cb99fa625c801ea7a4c5cf3c4ae5ec223","digest_alg":"sha1","size":260902,"type_ver":1,"type":"file","rev":1383052717754228,"id":"fc16ff62-b567-4591-ab8e-785cbd4db48d"},{"info":{"crc32":3362157033,"mime_type":"Composite Document File V2 Document, corrupt: Cant read SAT","has_thumb":false,"name":"学生实习报告(文件命名：学号_姓名_实习单位简称).doc","parent":"/常用","user_id":"f2c23318-f8f4-421b-bf59-766eea9b0a0f"},"has_link":false,"meta_id":"b1da43b2-30d8-4273-87c9-27a8703172e1","offset_hash_ctx":"","offset":33280,"committer":"f2c23318-f8f4-421b-bf59-766eea9b0a0f","device":"web","status":"active","mod_date":"2014-02-07T06:46:07Z","create_date":"2014-02-07T06:46:07Z","hash":"8745df7918e262f25201d86c3b62563ac63ef02f","digest_alg":"sha1","size":33280,"type_ver":1,"type":"file","rev":1391755567493849,"id":"4a39f594-03cd-48b9-9098-05825f864592"},{"info":{"crc32":4202442645,"mime_type":"text/plain","has_thumb":false,"name":"学院网通知要做的事.txt","parent":"/常用","user_id":"f2c23318-f8f4-421b-bf59-766eea9b0a0f"},"has_link":false,"meta_id":"508447a2-a048-40ad-a98c-c0ad10453ca1","offset_hash_ctx":"","offset":86,"committer":"f2c23318-f8f4-421b-bf59-766eea9b0a0f","device":"Eleven-PC","status":"active","mod_date":"2013-11-12T02:22:56Z","create_date":"2013-11-12T02:22:56Z","hash":"8463a2494631ec9c4e32060d896fe677a9aea939","digest_alg":"sha1","size":86,"type_ver":1,"type":"file","rev":1384222976100086,"id":"8087ae4c-ef13-44d2-bfbb-54b794701309"}]}';

//*********************************************************
function arrayRecursive(&$array)  
{  
	foreach ($array as $key => $value) {  
		if (is_array($value)) {  
			arrayRecursive($array[$key]);//如果是数组就进行递归操作  
		} else {  
			if(is_string($value)){  
				$array[$key] = urlencode($value);//如果是字符串就urlencode  
			}else{  
				$array[$key] = $value;  
			}  
		}  
	}  
}  
function JSON($result) {  
	$array=$result;  
	arrayRecursive($array);//先将类型为字符串的数据进行 urlencode  
	$json = json_encode($array);//再将数组转成JSON  
	return urldecode($json);//最后将JSON字符串进行urldecode  
}  
$result_array = json_decode($result);
$data = array(
	"info_code" => $info,
	"result" =>  $result_array
);

$output = JSON($data);//这里的$data是一个数组（可以是多维数组）  

echo $output;

echo "</ br>";

echo $output['info_code'];

echo "</ br>";

// echo $data['result'];



// *********************************************************
// $result_array = json_decode($result);

// $data = array(
 // "info_code" => $info,
 // "result" => $result_array 
// );

// $output = json_encode($data);

// $output = preg_replace("#\\\u([0-9a-f]+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", $output);

// echo $output;

// var_dump($output[1]);

// *********************************************************
// $result2 = '{"info_code":'. $info . ',"result":' . $result . '}';

// echo $result2;

?>