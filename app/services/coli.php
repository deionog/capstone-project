<?php
include 'WolframAlphaEngine.php';

$appID = '2EG2T5-8E98H3EQ9U';

// instantiate an engine object with your app id
//$engine = new WolframAlphaEngine( $appID );

//$response = $engine->getResults( 'moving from St Louis to San Francisco salary $42,500', array( lk => 3 ) );

/*
if ( $response->isError ) {

  echo "<h1>There was an error in the request</h1>";

    die();
}

echo "<h1>Results</h1>
<br>";

  // if there are any assumptions, display them 
  if ( count($response->getAssumptions()) > 0 ) {

    echo "<h2>Assumptions:</h2>
    <ul>";

      // assumptions come as a hash of type as key and array of assumptions as value
      foreach ( $response->getAssumptions() as $type => $assumptions ) {

        echo "<li>" . $type . "<br>
          <ol>";

          foreach ( $assumptions as $assumption ) {

            echo "<li>" . $assumption->name ." ". $assumption->description . " to change search to this assumption <a href='simpleRequest.php?q=" . urlencode($assumption->input) . "'>click here</a></li>";

          }
		  
          echo "</ol>
        </li>";
      }
      
    echo "</ul>";
  }

echo "<hr>";

  // if there are any pods, display them
  if ( count($response->getPods()) > 0 ) {

    echo '<h2>Pods</h2>
    <table border=1 width="80%" align="center">';

    foreach ( $response->getPods() as $pod ) {

      echo "<tr>
        <td>
          <h3>" . $pod->attributes['title'] . "</h3>";

        // each pod can contain multiple sub pods but must have at least one
        foreach ( $pod->getSubpods() as $subpod ) {
          // if format is an image, the subpod will contain a WAImage object

         echo '<img src="' . $subpod->image->attributes['src'] . '>
          <hr>';
        }

          
        echo "</td>
      </tr>";
    }

    echo "</table>";
  }
 * */

$response = file_get_contents("http://api.wolframalpha.com/v2/query?input=cost%20of%20living%20index%20Boston&appid=2EG2T5-8E98H3EQ9U&includepodid=Result");
$xml = new SimpleXMLElement($response);

foreach ($xml->pod as $pod) {
	echo "<div>
			<h1>" . $pod['title'] . "</h1>";
			
		foreach ($pod->subpod as $subpod) {
			echo "<p>" . $subpod['title'] . "</p>";
			echo "<img src=" . $subpod->img['src'] . " />";
		}
		echo "</div>";
}
//echo $xml->asXML();
/* *
 foreach($xml->xpath('//pod->subpod->img') as $img) {
		echo $img;
	echo "<img src=" . $img['src'] . "/>";
}
 * */

?>