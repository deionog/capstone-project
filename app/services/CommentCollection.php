<?php
session_start();
require('../../dbInfo.inc.php');
require('../../dbHelper.php');

// Declare Variables
$user = $_SESSION["user"];
$comment = $_POST["comment"];
$place = $_POST["cityReviewed"];
$id = "";
$date = "";
$reported = 0;

// Establish Connection to Database
$mysqli=new mysqli($db,$dbUsername,$dbPassword,$myDb);  
if(mysqli_connect_errno()){
	print('connection failed: '. mysqli_connect_error());
	exit();
}


// Query database using a prepared statement
if($stmt =$mysqli->prepare("insert into Comments values (?,?,?,?,?,?)")){
	//bind the parameters (s-string, i-int, d-double, b-blob)
	$stmt->bind_param("issssi",$id,$comment,$user,$date, $place, $reported);
	$stmt->execute();

	if($stmt->affected_rows > 0){
		
	
	}else{
		//header("HTTP/1.0 204 No Response");
		$_SESSION['status'] = "POST_FAILED";
	}
	$stmt->close();
}

$mysqli->close();



?>