function getHashCode(str){
	var hash = 1315423911;
	var i;
	for (i = str.length - 1; i >= 0; i--) {
		hash ^= ((hash << 5) + str.charCodeAt(i) + (hash >> 2));
	}
	var n =  (hash & 0x7FFFFFFF)%10;
	return n;
}
function getKeywords(publiclink_name_1,str1,str2,url){
	var m = getHashCode(url) ;
	var keyvalue = new Array(str1,str2[m],str2[m+1],str2[m+2]);
	return keyvalue;
}
