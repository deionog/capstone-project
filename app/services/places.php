<?php
 $id = $_GET["state"];
 
 $url = "http://api.census.gov/data/2010/sf1?key=93b239eaf27cd41643845af4697fab56b8ea4e8f&get=NAME&for=place:*&in=state:" . $id;
 $response = file_get_contents($url);
 $myJson = array();
 $json = json_decode($response);
 $nd = 1;
 foreach($json as $js ){
 	if ($nd > 1) {
 		//echo $js[0];
 		//echo "\n";
 		array_push($myJson, array( "name" => $js[0]));
 		//array_push($myJson, $js[0]);
 	}
 	$nd++;
 }
 
 $myJson = json_encode($myJson);
 
 if (!empty($_GET["term"])){
 	$myJson = array_filter($myJson, function($obj){
 		if (stripos($obj->name, $_GET["term"])){
 			echo $obj->name;
 		}
 	});
 	//foreach($myJson as $i){
 		//filter_array($i);
 	//}
 }
 
 function filter_array($item){
 	 return (stripos($item["name"], $_GET['term']));
 	//return (is_array($item) && strpos($item.name, $_GET['term']));
 }
 
 echo "<pre>";
 	print($myJson);
 echo "</pre>";
 //echo json_encode($myJson);

?>