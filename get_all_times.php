<?php
$user="chris";
$password="tenretni";
$dbconn = pg_connect("host=192.168.1.112 dbname=ApartmentTravelTimes user=$user password=$password") or die('Could not connect: ' . pg_last_error());
// Performing SQL query
$day = $_GET["day"];
$destination = $_GET["destination"];

$query = "SELECT day_of_week, leave_time, l1.name as origin, l2.name as destination, avg(travel_time) FROM travel_times as tt JOIN locations as l1 ON tt.origin_id=l1.id JOIN locations as l2 ON tt.destination_id=l2.id WHERE day_of_week='$day' AND l2.name='$destination' GROUP BY day_of_week, leave_time, origin, destination ORDER BY day_of_week DESC, leave_time, destination, origin;";

$result = pg_query($query) or die('Query failed: ' . pg_last_error());

$myarray = array();
while ($row = pg_fetch_object($result)) {
  $myarray[] = $row;
}

echo json_encode($myarray);

?>
