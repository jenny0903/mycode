<?php
$url = "https://10.32.33.2:443/3.0/user/upgrade";

//连接数据库
$con = mysql_connect("localhost","root","");
//判断是否连接成功
if (!$con){
	die('Could not connect: ' . mysql_error());
}
//选择DB
mysql_select_db("test", $con);

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
				$id = $value['id'];
				$token = $value['token'];
				$cookie= 'Authorization: Bearer '.$token;
				$curl = curl_init();
				curl_setopt($curl, CURLOPT_URL, $url);                  
				curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);    
				curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);      
				curl_setopt($curl, CURLOPT_USERAGENT, 'yunio/3.0');			
				curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求 
				curl_setopt($curl, CURLOPT_HTTPHEADER, Array($cookie));	
				curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data_low );// Post提交的数据包      
				curl_setopt($curl, CURLOPT_TIMEOUT, 30);     
				curl_setopt($curl, CURLOPT_HEADER, 0);     
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
				curl_exec($curl);			
				$info_low  = curl_getinfo($curl);
				$upgrade_date_low = date('Y-m-d H:i:s');
				if($info_low['http_code'] == 200){
					sql4 = "insert into orders(status, updated_at) values (2, '$upgrade_date_low') where id='$id'";
					$result4 = mysql_query($sql4,$con);					  
				}else{
					sql5 = "insert into orders(status, updated_at) values (3, '$upgrade_date_low') where id='$id'";
					$result5 = mysql_query($sql5,$con);
				}
				
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
				$id = $value['id'];
				$token = $value['token'];
				$cookie = 'Authorization: Bearer '.$token;
				$curl = curl_init();
				curl_setopt($curl, CURLOPT_URL, $url);                  
				curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);    
				curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);      
				curl_setopt($curl, CURLOPT_USERAGENT, 'yunio/3.0');			
				curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求 
				curl_setopt($curl, CURLOPT_HTTPHEADER, Array($cookie));	
				curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data_high);// Post提交的数据包      
				curl_setopt($curl, CURLOPT_TIMEOUT, 30);     
				curl_setopt($curl, CURLOPT_HEADER, 0);     
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); 
				curl_exec($curl);			
				$info_high = curl_getinfo($curl);
				$upgrade_date_high = date('Y-m-d H:i:s');
				if($info_high['http_code'] == 200){
					sql6 = "insert into orders(status, updated_at) values (2, '$upgrade_date_high') where id='$id'";
					$result6 = mysql_query($sql6,$con);					  
				}else{
					sql7 = "insert into orders(status, updated_at) values (3, '$upgrade_date_high') where id='$id'";
					$result7 = mysql_query($sql7,$con);  
				}				
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