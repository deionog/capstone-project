<?php
session_start();
require('../../dbInfo.inc.php');
require('../../dbHelper.php');


$mysqli=new mysqli($db,$dbUsername,$dbPassword,$myDb);  
if(mysqli_connect_errno()){
	print('connection failed: '. mysqli_connect_error());
	exit();
}

$data = file_get_contents("php://input");
$objData = json_decode($data);

$user = $objData->uname;
$pass = sha1($objData->pwd);

if($stmt =$mysqli->prepare("select * from User where username=? and password=?")){
	//bind the parameters (s-string, i-int, d-double, b-blob)
	$stmt->bind_param("ss",$user,$pass);
	$data=returnJson($stmt);

	if($data != 'null'){
		$currTime = time();
		$convertDate = base_convert($currTime,11,17);
		$ip = base_convert($_SERVER['REMOTE_ADDR'],13,19);
		$uChar = sha1($_POST['uname']);
		$uChar = substr($uChar,8,5);
		$token = $convertDate.$uChar.$ip;
		$_SESSION['token'] = $token;
		$_SESSION['user'] = $user;
		$_SESSION['loggedIn'] = 'true';
		
		if($stmt =$mysqli->prepare("UPDATE User SET token=?,active_login=1 WHERE username=?")){
			$stmt->bind_param('ss',$token,$user);
			$stmt->execute();	
			header("HTTP/1.0 200 OK");
		}
	}else{
		// Deny access
		header("HTTP/1.0 204 No Response");
	}
	$stmt->close();
}

$mysqli->close();



?>