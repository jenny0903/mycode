//新增：后缀省略并限制
//所有超出长度的字符串都以省略号省略，省略号后保留原字符串最后n个字符。文件名保留后缀。
//计算字符串长度，一个中文字符占一个长度，两个英文字符长度为一个中文字符长度
function shortenString(str, flag, num){
	var newStr = '';
	var newLength = 0;
	var chineseRegex = new RegExp("[^\x00-\xff]","g");
	var singleChar = "";
	var typeStr3 = '';//省略号后保留的三个字符
	var typeStr = ''; //后缀名
	var houZhui = '';
	var m = 0, typeStr3Len = 0, typeStrLen = 0,houZhuiLen = 0;//typeStr3Len代表省略号后实际保留的字符长度，typeStrLen为后缀的字符长度。
	var baoliu = 5; //省略号后面的保留的字符长度
	var hz_baoliu = 3; //后缀的保留限制
	var strLength = str.replace(chineseRegex,"**").length;//单字节时字符长度
	function charJudge(singleChar){//判断是否是中文字符
		var len = 0;
		if(singleChar.match(chineseRegex) != null){
			len =1;
		}else{
			len =0.5;
		}
		return len;
	}
	if( strLength > num*2 ){ //当字符超出限制时，对字符进行处理。否则，原样输出。
		if(flag == false){ //除文件名外的一切字符串，包括文件夹名称。string = "现在这则消息终于被微软官方证实。";
			if( num-baoliu-1.5 < 1 ){//避免产生省略号无字符情况
				baoliu -= Math.abs(num-baoliu-1.5-1);
			}
			for(var j = str.length-1, m=0; j >=0, m<=baoliu; j--){
				singleChar = str.charAt(j).toString();
				typeStr3Len += charJudge(singleChar);
				if(typeStr3Len <= baoliu){
					typeStr3 += singleChar;
				}else{
					typeStr3Len -= charJudge(singleChar);
					break;
				}
				m = typeStr3Len;//控制省略号后保留字符的长度
			}
			typeStr3 = typeStr3.toString().split("").reverse().join("")
			for(var i = 0;i < strLength;i++){
				singleChar = str.charAt(i).toString();
				newLength += charJudge(singleChar);
				if(newLength <= num-1.5-typeStr3Len){
					newStr += singleChar;
				}
				if(newLength > num-typeStr3Len){
					break;
				}			
			}
			newStr = newStr+"..."+typeStr3;
		}
		if(flag == true){//文件名	var string = "[电影]斯.皮尔伯格最中文字幕8098p.7zjnj";
			var j = 0 ; //控制文件名的最后N个字符及后缀的位置 
			if(str.lastIndexOf(".")> 0 ){ //文件有后缀名
				typeStr = str.substr(str.lastIndexOf("."));//截取文件名后缀
				for(var i = 0;i <typeStr.length;i++){
					singleChar = typeStr.charAt(i).toString();
					typeStrLen += charJudge(singleChar);
				}
				j = str.lastIndexOf(".")-1;
			}else{//文件没有后缀名
				typeStrLen = 0;
				j = str.length-1;				
			}
			if( typeStrLen > hz_baoliu){ //后缀的最长长度一般不超过3.5个字符（汉字），即7个英文字符。加上后缀标志即最长长度不超过4个字符。
				for(var i = 0, m=0; i <typeStr.length,m<=hz_baoliu; i++){
					singleChar = typeStr.charAt(i).toString();
					houZhuiLen += charJudge(singleChar);
					if(houZhuiLen <= hz_baoliu){
						houZhui += singleChar;
					}else{
						houZhuiLen -= charJudge(singleChar);
						break;
					}
					m = houZhuiLen;
				}
				houZhui += "...";
				houZhuiLen +=1.5; //后缀的实际长度
				
			}else{
				houZhuiLen = typeStrLen;
				houZhui = typeStr;
			}		
			if( num-baoliu-1.5-houZhuiLen < 1){//避免产生省略号无字符情况
				baoliu -= Math.abs(num-baoliu-1.5-houZhuiLen-1);
			}
			if(str.substr(0,j+1).length > num-houZhuiLen){
				for( m=0; j >0, m<=baoliu; j--){
					singleChar = str.charAt(j).toString();
					typeStr3Len += charJudge(singleChar);
					if(typeStr3Len <= baoliu){
						typeStr3 += singleChar;
					}else{
						typeStr3Len -= charJudge(singleChar);
						break;
					}
					m = typeStr3Len;//控制省略号后保留字符的长度
				}
				typeStr3 = "..."+typeStr3.toString().split("").reverse().join("");
				typeStr3Len +=1.5;	
				for(var i = 0;i < strLength;i++){
					singleChar = str.charAt(i).toString();
					newLength += charJudge(singleChar);
					if(newLength <= num-typeStr3Len-houZhuiLen){
						newStr += singleChar;
					}
					if(newLength > num-typeStr3Len-houZhuiLen){
						break;
					}
				}	
			}else{
				typeStr3 = "";
				newStr = str.substr(0,j+1);
				typeStr3Len = 0;
			}	
		newStr = newStr+typeStr3+houZhui;
		}
	}else{
		newStr = str; 
	}
	return newStr;
}