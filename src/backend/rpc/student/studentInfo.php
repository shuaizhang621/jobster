<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/19
 * Time: 17:18
 */
//get classes used in this file.
require("../../entity/classes.php");
$objectStudentInfo = new personal_info();
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

//get parameter from forntend
$semail = $_POST['semail'];
$semail = htmlspecialchars($semail, ENT_QUOTES);
//initialize response to frontend.
$response = array();
$temp_array = array();

//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}

//query student info from backend database if the company accepts the application.
$sql_student_info = "select * from Student where semail = ?;";
$student_info = $conn->prepare($sql_student_info);
$student_info->bind_param('s',$semail);
$student_info->execute();
$result_student_info = $student_info->get_result();
if ($result_student_info->num_rows > 0){
    $row = $result_student_info->fetch_assoc();
    $info = $objectStudentInfo->Build_personal_Info($row);
    array_push($temp_array, $info);
    $response['student_info'] = $temp_array;
}
else
{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}
echo json_encode($response);

$conn->close();
?>