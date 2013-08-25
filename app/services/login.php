<?php
session_start();
require('../../dbInfo.inc.php');
require('../../dbHelper.php');

// Declare Variables
$user = "";
$loginAttempts = 0;

// Check How Many login attempts have been made
if (isset($_SESSION['loginAttempts']) || !empty($_SESSION['loginAttempts'])) {
	$loginAttempts = $_SESSION['loginAttempts'];
} 

// If login attempts is >= 4: Redirect user to Login with Caption OR Prevent Further Attempts for 2 minutes
if ($loginAttempts >= 4){
	setcookie("loginAttempts", true, time()+120);
	$_SESSION["loginAttempts"] = 0;
	exit();
}

// Establish Connection to Database
$mysqli=new mysqli($db,$dbUsername,$dbPassword,$myDb);  
if(mysqli_connect_errno()){
	print('connection failed: '. mysqli_connect_error());
	exit();
}

$data = file_get_contents("php://input");
$objData = json_decode($data);

// Validate email address
if (filter_var($objData->uname, FILTER_VALIDATE_EMAIL)) {
	$user = $objData->uname;
	$user = filter_var($user, FILTER_SANITIZE_EMAIL);
}

// Encrypt Password
$pass = sha1($objData->pwd);

// Query database using a prepared statement
if($stmt =$mysqli->prepare("select * from User where email=? and password=?")){
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
		$_SESSION['user'] =$user;
		$_SESSION['loggedIn'] = 'true';
		
		if($stmt =$mysqli->prepare("UPDATE User SET token=?,active_login=1 WHERE email=?")){
			$stmt->bind_param('ss',$token,$user);
			$stmt->execute();	
			header("HTTP/1.0 200 OK");
		}
		
	}else{
		$loginAttempts += 1;
		$_SESSION['loginAttempts'] = $loginAttempts;
		header("HTTP/1.0 204 No Response");
	}
	$stmt->close();
}

$mysqli->close();



?>