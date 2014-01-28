<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
<title>css3 3d rotate</title>
<style type="text/css">
body,div,ul,li{
	padding:0;
	margin:0;
}
.container ul li {
	height: 180px;
	width: 180px;
	margin-right: 20px;
	margin-bottom: 20px;
	display: inline;
	-webkit-perspective: 1000px;
	-moz-perspective: 1000px;
	float: left;
}
.out_box{
	position: relative;
	height: 180px;
	width: 180px;
	-webkit-transform-style: preserve-3d; 
	-moz-transform-style: preserve-3d;
	-ms-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transition: 0.5s; 
	-moz-transition: 0.5s;
	-o-transition: 0.5s;
	-ms-transition: 0.5s;
	transition: 0.5s;
	-webkit-backface-visibility: hidden; 
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
}
.out_box div{
	display: block;
    height: 180px;
    width: 180px;
    position: absolute;
	left: 0;
	top: 0;
	background: #060;
	text-align: center;
	-webkit-backface-visibility: hidden; 
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
	color:#FFF;
	line-height:180px;
	font-size:16px;
}
.out_box .front_box{
	z-index: 2;
}
.out_box .back_box{
	z-index: 1;
	-webkit-transform: rotateY(180deg);
	-moz-transform: rotateY(180deg);
	transform: rotateY(180deg);
}
.container ul li:hover .out_box{
	-webkit-transform: rotateY(180deg);
	-moz-transform: rotateY(180deg);
	transform: rotateY(180deg);
}
.container ul li:hover .back_box{
	z-index: 3;
}
</style>
</head>

<body>
<div class="container">
	<ul>
		<li>
        	<div class="out_box">
                <div class="front_box">front</div>
                <div class="back_box">back</div>
            </div>
		</li>
        <li>
        	<div class="out_box">
                <div class="front_box">front2</div>
                <div class="back_box">back2</div>
            </div>
		</li>
        <li>
        	<div class="out_box">
                <div class="front_box">front3</div>
                <div class="back_box">back3</div>
            </div>
		</li>
	</ul>
</div>
</body>
</html>
