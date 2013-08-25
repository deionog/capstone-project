<?php
session_start();
require('../../dbInfo.inc.php');
require('../../dbHelper.php');

// Declare Variables
$email = null;
$pwd = null;
$confirm = null;

// Establish Connection to Database
$mysqli=new mysqli($db,$dbUsername,$dbPassword,$myDb);  
if(mysqli_connect_errno()){
	print('connection failed: '. mysqli_connect_error());
	exit();
}


// Validate email address
if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
	$email = $_POST['email'];
}

// Encrypt Password
$pass = sha1($_POST['pwd']);

// Query database using a prepared statement
if($stmt =$mysqli->prepare("insert into User values (?,?,?,?,?,?)")){
	//bind the parameters (s-string, i-int, d-double, b-blob)
	$stmt->bind_param("sssisi",$email,$pass,$email, 1, "", 0);
	$stmt->execute();

	if($stmt->affected_rows > 0){
		$currTime = time();
		$convertDate = base_convert($currTime,11,17);
		$ip = base_convert($_SERVER['REMOTE_ADDR'],13,19);
		$uChar = sha1($_POST['email']);
		$uChar = substr($uChar,8,5);
		$token = $convertDate.$uChar.$ip;
		$_SESSION['token'] = $token;
		$_SESSION['user'] = $email;
		$_SESSION['loggedIn'] = 'true';
		
		if($stmt =$mysqli->prepare("UPDATE User SET token=?,active_login=1 WHERE username=?")){
			$stmt->bind_param('ss',$token,$email);
			$stmt->execute();	
			header("www.deionlive.com/capstone/app");
		}
	}else{
		//header("HTTP/1.0 204 No Response");
		$_SESSION['status'] = "SIGNUP_FAILED";
	}
	$stmt->close();
}

$mysqli->close();



?>