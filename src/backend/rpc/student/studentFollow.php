<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/23
 * Time: 21:43
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
$cname = $_POST['cname'];
//prevent xss attack
$semail = htmlspecialchars($semail, ENT_QUOTES);
$cname = htmlspecialchars($cname, ENT_QUOTES);

//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}

//initialize response to frontend.
$reponse = array();

//insert tuple into backend database.
$sql_init_student_follow = "INSERT INTO StudentFollowCompany (`semail`,`cname`) VALUES (?, ?);";
$init_student_follow = $conn->prepare($sql_init_student_follow);
$init_student_follow->bind_param('ss',$semail,$cname);
if ($init_student_follow->execute()){
    $response = "You have followed " . $cname . " succesfully.";
}
else {
    $response = "You have followed " . $cname . " before.";
}

echo $response;
$conn->close();
