<?php
$user="chris";
$password="tenretni";
$dbconn = pg_connect("host=192.168.1.102 dbname=ApartmentTravelTimes user=$user password=$password") or die('Could not connect: ' . pg_last_error());
// Performing SQL query
$day = $_GET["day"];
$query = "SELECT * FROM travel_times WHERE day_of_week = '$day'";
$result = pg_query($query) or die('Query failed: ' . pg_last_error());

$myarray = array();
while ($row = pg_fetch_object($result)) {
  $myarray[] = $row;
}

echo json_encode($myarray);

?>
