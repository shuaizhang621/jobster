<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/5/4
 * Time: 19:46
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

//get parameter from frontend.
$semail = $_POST['semail'];
$sprivacy = $_POST['sprivacy'];
$semail = htmlspecialchars($semail, ENT_QUOTES);

//initialize response to frontend.
//$response = array();

//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}

//update privacy setting.
$sql_update_privacy = "update Student set sprivacy = ? where semail = ?;";
$update_privacy = $conn->prepare($sql_update_privacy);
$update_privacy->bind_param('ss', $sprivacy, $semail);
if ($update_privacy->execute()){
    $response = "Updated successfully!";
}
else{
    $response = "Updated unsuccessfully!";
}
echo $response;
$conn->close();
?>