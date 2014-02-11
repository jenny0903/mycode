<?php 
//GB2312的Encode 
echo urlencode(urlencode(","))."\n"; //%D6%D0%CE%C4-_.+ 
// echo urldecode("%D6%D0%CE%C4-_. ")."\n"; //中文-_. 
// echo rawurlencode("中文-_. ")."\n"; //%D6%D0%CE%C4-_.%20 
// echo rawurldecode("%D6%D0%CE%C4-_. ")."\n"; //中文-_. 
?> 