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
$semail = $_POST['semail'];
$nid = $_POST['nid'];
//prevent xss attack
$nid = htmlspecialchars($nid, ENT_QUOTES);
$semail = htmlspecialchars($semail, ENT_QUOTES);

//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}


//update the notification status to 'viewed' at backend database.
$sql_update_notification = "update Notification set status = 'viewed' where nid = ?";
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