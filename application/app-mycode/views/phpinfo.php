<?php
//查看php版本
echo phpinfo();

//时间格式2014-01-27T14:15:33Z
// $date = date('Y-m-d H:i:s',time());
// echo $date;
// echo(gmdate(DATE_ATOM,time()))."\n";
// echo date("Y-m-d").'T'.date("H:i:s").'Z'."\n";

//生成唯一id
// function guid(){
    // if (function_exists('com_create_guid')){
        // return com_create_guid();
    // }else{
        // mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
        // $charid = strtoupper(md5(uniqid(rand(), true)));
        // $hyphen = chr(45);// "-"
        // $uuid = substr($charid, 0, 8).$hyphen
                // .substr($charid, 8, 4).$hyphen
                // .substr($charid,12, 4).$hyphen
                // .substr($charid,16, 4).$hyphen
                // .substr($charid,20,12);               
        // return $uuid;
    // }
// }
// echo guid();




?>