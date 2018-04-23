<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/18
 * Time: 20:42
 */
class student_info_restircted{
    public $suniversity;
    public $smajor;
    public $sgpa;
    public $sresume;
}

function Build_student_info_restricted($row)
{
    $restrictedStudentInfo = new student_info_restircted();
    $restrictedStudentInfo->suniversity = $row['suniversity'];
    $restrictedStudentInfo->smajor = $row['smajor'];
    $restrictedStudentInfo->sgpa = $row['sgpa'];
    $restrictedStudentInfo->sresume = $row['sresume'];
    return $restrictedStudentInfo;
}
//the parameters that used for connecting to database.
$servername = "localhost";
$dbusername = "root";
$password = "";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $dbusername, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

//get parameter from forntend
$aid = $_POST['aid'];
$semail = $_POST['semail'];

//initialize response to frontend.
$response = array();
$temp_array = array();

//query student info from backend database if the company accepts the application.
$sql_student_info = "select suniversity, smajor, sgpa, sresume from Student where semail = '$semail';";
$sql_student_application_update = "update studentapplyjob set status = 'pending' where aid = '$aid';";
$result_student_info = mysqli_query($conn, $sql_student_info);
if ($result_student_info->num_rows > 0){
    $row = $result_student_info->fetch_assoc();
    $info =  Build_student_info_restricted($row);
    array_push($temp_array, $info);
    $response['student_info'] = $temp_array;
}
else
{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}

if (mysqli_query($conn, $sql_student_application_update) == True){
    $reponse['student_info_update'] = "Updated successfully.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}

echo json_encode($response);

$conn->close();
?>