<?php
require('../../dbInfo.inc.php');
require('../../dbHelper.php');

$mysqli=new mysqli($db,$dbUsername,$dbPassword,$myDb);  
if(mysqli_connect_errno()){
	print('connection failed: '. mysqli_connect_error());
	exit();
}

/*  STATES to ABBREVIATION */
$states = array(
    'AL'=>'Alabama',
    'AK'=>'Alaska',
    'AZ'=>'Arizona',
    'AR'=>'Arkansas',
    'CA'=>'California',
    'CO'=>'Colorado',
    'CT'=>'Connecticut',
    'DE'=>'Delaware',
    'DC'=>'District of Columbia',
    'FL'=>'Florida',
    'GA'=>'Georgia',
    'HI'=>'Hawaii',
    'ID'=>'Idaho',
    'IL'=>'Illinois',
    'IN'=>'Indiana',
    'IA'=>'Iowa',
    'KS'=>'Kansas',
    'KY'=>'Kentucky',
    'LA'=>'Louisiana',
    'ME'=>'Maine',
    'MD'=>'Maryland',
    'MA'=>'Massachusetts',
    'MI'=>'Michigan',
    'MN'=>'Minnesota',
    'MS'=>'Mississippi',
    'MO'=>'Missouri',
    'MT'=>'Montana',
    'NE'=>'Nebraska',
    'NV'=>'Nevada',
    'NH'=>'New Hampshire',
    'NJ'=>'New Jersey',
    'NM'=>'New Mexico',
    'NY'=>'New York',
    'NC'=>'North Carolina',
    'ND'=>'North Dakota',
    'OH'=>'Ohio',
    'OK'=>'Oklahoma',
    'OR'=>'Oregon',
    'PA'=>'Pennsylvania',
    'RI'=>'Rhode Island',
    'SC'=>'South Carolina',
    'SD'=>'South Dakota',
    'TN'=>'Tennessee',
    'TX'=>'Texas',
    'UT'=>'Utah',
    'VT'=>'Vermont',
    'VA'=>'Virginia',
    'WA'=>'Washington',
    'WV'=>'West Virginia',
    'WI'=>'Wisconsin',
    'WY'=>'Wyoming',
);

//$data = file_get_contents("php://input");
//$objData = json_decode($data);
//$state = "Alabama";
$cities = $_GET['cities'];
$cities = explode("$", $cities);
$json = array();
//$func = $objData->func;

	//echo "Begin DB check..." . $cities . " = " . count($cities);
	
	for($i = 0; $i < count($cities); $i++) {
		//echo "Sending Query.... <br>";	
		$city = explode(",", $cities[$i]);
		$state = trim($city[1]);
		
		//echo $state . "<br>";
		//echo $states[$state] . "<br>";
		//echo $city[0] . "<br>";
		
		if($stmt = $mysqli->prepare("select NAME,POP from Population where STNAME=? and NAME=? and SUMLEV = 162")){
			//bind the parameters (s-string, i-int, d-double, b-blob)
			$stmt->bind_param("ss",$states[$state], $city[0]);
			
			// Execute and fetch results
			$stmt->execute();
			$stmt->bind_result($name,$pop);
			$stmt->fetch();
			//$result = $stmt->get_result();
			
			//while($row = $stmt->fetch()) {
				$json[$i] = array("NAME" => $name, "POP" => $pop);
			//}
			
			//$data=returnJson($stmt);
			//echo "Here is: " . var_dump($json);
			//$json .= $data;
			$stmt->close();
		}
	}
	
	//echo "<br>End of DB check<br>";
	//echo json_decode($json);
	
	if($json != 'null'){
		echo json_encode($json);
	}else{
		// Deny access
		header("HTTP/1.0 204 No Response");
	}

	$mysqli->close();



?>