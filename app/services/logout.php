<?php
session_start();
require('../../dbInfo.inc.php');
require('../../dbHelper.php');

// Declare Variables
$user = "";

$token = "";

if (isset($_SESSION['user']) && !empty($_SESSION['user'])){
	$user = $_SESSION['user'];
	
// Establish Connection to Database
$mysqli=new mysqli($db,$dbUsername,$dbPassword,$myDb);  
if(mysqli_connect_errno()){
	print('connection failed: '. mysqli_connect_error());
	exit();
}


// Query database using a prepared statement
	if($stmt =$mysqli->prepare("UPDATE User SET token=?,active_login=0 WHERE username=?")){
		$stmt->bind_param('ss',$token,$user);
		$stmt->execute();
		header("HTTP/1.0 200 OK");	
	}

	$stmt->close();
	$_SESSION['loggedIn'] = false;
	session_destroy();
	

$mysqli->close();
}



?>