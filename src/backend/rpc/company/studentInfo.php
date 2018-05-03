<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/18
 * Time: 20:42
 */
// import the classes used in this file
require("../../entity/classes.php");
$objectStudentInfoRestricted = new student_info_restircted();
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
$aid = $_POST['aid'];
$semail = $_POST['semail'];
//prevent xss attack
$aid = htmlspecialchars($aid, ENT_QUOTES);
$semail = htmlspecialchars($semail, ENT_QUOTES);

//initialize response to frontend.
$response = array();
$temp_array = array();

//query student info from backend database if the company accepts the application.
$sql_student_info = "select suniversity, smajor, sgpa, sresume from Student where semail = ?;";
$student_info = $conn->prepare($sql_student_info);
$student_info->bind_param('s',$semail);
$student_info->execute();
$result_student_info = $student_info->get_result();

if ($result_student_info->num_rows > 0){
    $row = $result_student_info->fetch_assoc();
    $info =  $objectStudentInfoRestricted->Build_student_info_restricted($row);
    array_push($temp_array, $info);
    $response['student_info'] = $temp_array;
}
else
{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}

//update the status of this application.
$sql_student_application_update = "update studentapplyjob set status = 'pending' where aid = ?;";
$student_application_update = $conn->prepare($sql_student_application_update);
$student_application_update->bind_param('s', $aid);

if ($student_application_update->execute()){
    $reponse['student_info_update'] = "Updated successfully.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}

echo json_encode($response);

$conn->close();
?>