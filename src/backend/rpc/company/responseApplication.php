<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/17
 * Time: 20:38
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

//get parameters from the frontend.
$cname = $_POST['cname'];
$aid = $_POST['aid'];
$status = $_POST['status'];
//prevent xss attack.
$aid = htmlspecialchars($aid, ENT_QUOTES);
$status = htmlspecialchars($status, ENT_QUOTES);
$cname = htmlspecialchars($cname, ENT_QUOTES);

//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $cname)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}


//initialize the response to frontend.
//$response = array();

//update the backend database.
$sql_update_application_accepted = "update StudentApplyJob set status = ? where aid = ?;";
$update_application_accepted = $conn->prepare($sql_update_application_accepted);
$update_application_accepted->bind_param('ss', $status, $aid);
if ($update_application_accepted->execute()){
    $response = $status . " successfully.";
}
else
{
    header('HTTP/1.0 403 Forbidden');
    $reponse = "Database error:"."<br>"."$conn->error";
}
echo $response;
$conn->close();
?>