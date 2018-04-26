<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/17
 * Time: 23:01
 */
// import the classes used in this file
require("../../entity/classes.php");
$objectJobInfo = new job_info();
$objectStudentInfo = new personal_info();

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
//initialize feedback variable to frontend.
$response = array();

//get parameter from frontend.
$cname = $_POST['cname'];

//get new application from backend database

$sql_get_application_jobinfo = "select jid from StudentApplyJob where cname = '$cname' and status = 'unviewed';";

$result_get_application_studentinfo = mysqli_query($conn, $sql_get_application_studentinfo);
$result_get_application_jobinfo = mysqli_query($conn, $sql_get_application_jobinfo);

$temp_array =array();
if ($result_get_application_jobinfo->num_rows > 0){
    while ($row = $result_get_application_jobinfo->fetch_assoc()){
        $info = $objectJobInfo->Build_Job_Info($row);
        $temp_jid = $row['jid'];
        $sql_get_application_studentinfo = "select semail, sphone, sfirstname, slastname, sgpa, suniversity,
        smajor, sresume from Student where semail in (
select semail from StudentApplyJob where cname = '$cname' and status = 'unviewed' and jid = '$temp_jid';)";
        $result_get_application_studentinfo = mysqli_query($conn, $sql_get_application_studentinfo);
        if($result_get_application_studentinfo->num_rows > 0){
            while ($row_student = $result_get_application_studentinfo){
                $info_student = $objectStudentInfo->Build_personal_Info($row_student);
                $info->Append_student_followed($info_student);
            }
        }
        else{
            //echo error;
        }
        array_push($temp_array, $info);
    }
    $response['studentApplicationInfo'] = $temp_array;
}

//get company info
$sql_company_info = "select * from Company where cname = '$cname';";
$result_company_info = mysqli_query($conn, $sql_company_info);
$temp_array2 = array();
if ($result_company_info->num_rows > 0){
    $temp_array = $result_company_info->fetch_assoc();
    $response['companyInfo'] = $temp_array;
}

//return the results to frontend and close the connection to database.
echo json_encode($response);
$conn->close();
?>