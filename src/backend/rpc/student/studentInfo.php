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

//initialize response to frontend.
$response = array();
$temp_array = array();

//query student info from backend database if the company accepts the application.
$sql_student_info = "select * from Student where semail = '$semail';";
$result_student_info = mysqli_query($conn, $sql_student_info);
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