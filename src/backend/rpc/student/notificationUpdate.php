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
//prevent xss attack
$nid = htmlspecialchars($nid, ENT_QUOTES);

//update the notification status to 'viewed' at backend database.
$sql_update_notification = "update notification set status = 'viewed' where nid = ?";
$update_notification = $conn->prepare($sql_update_notification);
$update_notification->bind_param('s',$nid);
if ($update_notification->execute()){
    echo "Notification (nid = ".$nid.")has been update to viewed.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."\"<br>\".$conn->error";
}

$conn->close();
?>