<?php
//连接数据库
$con = mysql_connect("localhost","root","");
//判断是否连接成功
if (!$con){
	die('Could not connect: ' . mysql_error());
}
//选择DB
mysql_select_db("test", $con);

//自动升级
function upgrade($url,$cookie,$post_data){
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
	$info = curl_getinfo($curl);
	return $info["http_code"];
}

$url = "https://10.32.33.2:443/3.0/user/upgrade";

$upgrade_low = 0; //成功降级的用户数
$upgrade_high = 0;//成功升级的用户数

$new_date = date('Y-m-d'); //当前时间

$sql0 = "select date from upgrade_date order by id desc limit 1";
$result0 = mysql_query($sql0,$con);
$old_date = mysql_result($result0,0);//记录的最后一次自动升级的时间

$new_date_unix = strtotime($new_date);//当前时间的时间戳
$new_old_date_unix = strtotime($old_date.' + 1 day');//记录时间的后一天

if( $new_date_unix >= $new_old_date_unix){
	$now_date_unix = strtotime($old_date.' + 1 day');//正在升级时间：记录时间的后一天
	$now_date = date('Y-m-d',$now_date_unix);
	while( $now_date_unix <= $new_date_unix  ){//自动升级	
		//降用户等级
		$sql2 = "select * from orders where end_date='$now_date' and status=1";
		$result2 = mysql_query($sql2,$con);		
		if(mysql_num_rows($result2) > 0){
			while ($row = mysql_fetch_assoc($result2)) {
				$results_low[] = $row;
			}		
			$post_data_low = array(
				"role" => "unpaid"
			);
			$post_data_low = json_encode($post_data_low); 
				
			foreach($results_low as $key => $value){
				$user_id = $value['user_id'];
				$sql4 = "select token from tokens where user_id='$user_id' order by id desc limit 1";
				$result4 = mysql_query($sql4,$con);
				$token = mysql_result($result4,0);
				$cookie= 'Authorization: Bearer '.$token;
				
				$upgrade_flag = upgrade($url,$cookie,$post_data_low);
				
				// if($upgrade_flag == 200){
					// $upgrade_low += 1;
				// }				
			}
		}
			
		//升用户等级
		$sql3 = "select * from orders where begin_date='$now_date' and status=1";
		$result3 = mysql_query($sql3,$con);
		if(mysql_num_rows($result3) > 0){
			while ($row = mysql_fetch_assoc($result3)) {
				$results_high[] = $row;
			}				
			foreach($results_high as $key => $value){
				$user_id = $value['user_id'];
				$sql5 = "select token from tokens where user_id='$user_id' order by id desc limit 1";
				$result5 = mysql_query($sql5,$con);
				$token = mysql_result($result5,0);
				$cookie= 'Authorization: Bearer '.$token;
				
				$product = $value['product'];
				//根据购买的产品进行相应的会员升级
				switch($product){
					case 1:
						$post_data_high = array(
							"role" => "vip1"
						);
						break;
					case 2:
						$post_data_high = array(
							"role" => "vip2"
						);
						break;
					case 3:
						$post_data_high = array(
							"role" => "vip3"
						);
						break;
				}
				$post_data_high = json_encode($post_data_high); 
				$upgrade_flag = upgrade($url,$cookie,$post_data_high);
				// if($upgrade_flag == 200){
					// $upgrade_high += 1;
				// }				
			}
		}		
		$now_date_unix = strtotime($now_date.' + 1 day');//正在升级时间
		$now_date = date('Y-m-d',$now_date_unix);
	}	
}

$sql1 = "insert into upgrade_date( date, status) values ('$new_date', 1)";
$result1 = mysql_query($sql1,$con);
  
unset($results_low);
unset($results_high);
mysql_close($con);