<?php
// $input = array("a" => "green","", "red","b" => "green", "","blue", "red","c" => "witer","hello","witer");

$input = '["1-2-3","2-3-4","3-4-5","4-5-6","5-6-7","6-7-8","7-8-9","8-9-0"]';

$input = json_decode($input,true);


$result = array_unique($input); //去除重复元素
// $result = a_array_unique($input);   //只留下单一元素
foreach($result as $aa)
{
echo $aa."<br />";
}
function multi_unique($array) {
   foreach ($array as $k=>$na)
       $new[$k] = serialize($na);
   $uniq = array_unique($new);
   foreach($uniq as $k=>$ser)
       $new1[$k] = unserialize($ser);
   return ($new1);
}

function a_array_unique($array)//写的比较好
{
   $out = array();
   foreach ($array as $key=>$value) {
       if (!in_array($value, $out))
{
           $out[$key] = $value;
       }
   }
   return $out;
}
?>