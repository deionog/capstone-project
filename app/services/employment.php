<?php
include 'WolframAlphaEngine.php';

$appID = '2EG2T5-8E98H3EQ9U';

//$city = $_GET['city'];
//$state = $_GET['state'];
$params = urlencode($_GET['search']);
//$url = "http://api.wolframalpha.com/v2/query?input=crime%20rate%20in%20" . $city . "%20" . $state . "&appid=2EG2T5-8E98H3EQ9U&includepodid=History:CrimeRate:CrimeData";
$url = "http://api.wolframalpha.com/v2/query?input=unemployment%20rate%20in%20" . $params . "&appid=2EG2T5-8E98H3EQ9U&includepodid=History:UnemploymentRate:CityData";
$response = file_get_contents($url);
$xml = new SimpleXMLElement($response);
$body =$params;
$json = "";

foreach ($xml->pod as $pod) {
	$body = "<div>
			<h1>" . $pod['title'] . "</h1>";
			
		foreach ($pod->subpod as $subpod) {
			$body += "<p>" . $subpod['title'] . "</p>";
			$body += "<img src=" . $subpod->img['src'] . " />";
			//$json = array("city" => $city, "src" => $subpod->img['src']);
			$json = array("src" => $subpod->img['src']);
		}
		$body += "</div>";
}
//echo urlencode($params);
echo json_encode($json);


?>