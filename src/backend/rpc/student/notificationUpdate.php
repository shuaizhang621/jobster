<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/15
 * Time: 16:39
 */

//the parameters that used for connecting to database.
$servername = "localhost";
$dbusername = "root";
$password = "root";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $dbusername, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

//get parameters from frontend.
$nid = $_POST['nid'];

//update the notification status to 'viewed' at backend database.
$sql_update_notification = "update notification set status = 'viewed' where nid = '$nid'";

if (mysqli_query($conn, $sql_update_notification) == True){
    echo "Notification (nid = ".$nid.")has been update to viewed.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."\"<br>\".$conn->error";
}

$conn->close();
?>