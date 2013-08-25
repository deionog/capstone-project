<?php

$ZWSID = 'zws-id=X1-ZWz1bek9bwmvij_9hc6e';
$baseUrl = "http://www.zillow.com/webservice/GetDemographics.htm?";
$city = "&city=" . urlencode($_GET['city']);
$state = "&state=" . $_GET['state'];

$url = $baseUrl . $ZWSID . $city . $state;

$response = file_get_contents($url);
$xml = new SimpleXMLElement($response);
$tempArr = array();
$cityVal = "N/A";
$nationVal ="N/A";
$json = "";

echo $url . "<br />";
echo "<pre>";
print_r($xml);
echo "<br />";
print_r($xml->response->pages->page[2]->tables->table->data->attribute);
echo "</pre>";
//echo "Begin Loop with: ";
//var_dump($xml->pages["data"]);


foreach ($xml->response->charts->chart as $chart) {
	echo "<br />"; 
	$name = $chart->name;	
	echo $name . "<br />";
	echo "<img src=" . $chart->url . " /><br />";
	
	/*foreach ($attr->values as $val) {
				
		$cityVal = $val->city->value;
		$nationVal = $val->nation->value;
		
		echo $cityVal . "<br />";
		echo $nationVal . "<br />";
				
	}*/
		
	//$tempArr[] = array("name" => $name, "cityStat" => $cityVal, "nationVal" => $nationVal);	
}




//echo json_encode($json);


?>