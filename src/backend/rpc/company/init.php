<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/17
 * Time: 23:01
 */

//ini_set('display_errors', true);
//error_reporting(E_ALL);

// import the classes used in this file
require("../../entity/classes.php");
$objectJobInfo = new job_info();
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
//initialize feedback variable to frontend.
$response = array();

//get parameter from frontend.
//$cname = "ZhuYuanzhang";
$cname = $_POST['cname'];
//prevent xss attack
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


//get new application from backend database
$sql_get_application_jobinfo = "select * from JobAnnouncement where cname = ?;";
$get_application_jobinfo = $conn->prepare($sql_get_application_jobinfo);
$get_application_jobinfo->bind_param('s', $cname);
$get_application_jobinfo->execute();
$result_get_application_jobinfo = $get_application_jobinfo->get_result();


$temp_array =array();
if ($result_get_application_jobinfo->num_rows > 0){
    while ($row = $result_get_application_jobinfo->fetch_assoc()){
        $info = $objectJobInfo->Build_Job_Info($row);
        $temp_jid = $row['jid'];
//        echo $temp_jid."<br>";
        $sql_get_application_studentinfo = "select semail, aid, sphone, slastname,sfirstname,sgpa,smajor, suniversity,
sresume, sprivacy from Student natural join StudentApplyJob where aid in (
select aid from StudentApplyJob where (cname = ?) and (status = 'unviewed') and (jid = '$temp_jid'));";
        $get_application_studentinfo = $conn->prepare($sql_get_application_studentinfo);
        $get_application_studentinfo->bind_param('s', $cname);
        $get_application_studentinfo->execute();
        $result_get_application_studentinfo = $get_application_studentinfo->get_result();
        if($result_get_application_studentinfo->num_rows > 0){
            //echo 'got student'."<br>";
            while ($row_student = $result_get_application_studentinfo->fetch_assoc()){
                $info_student = $objectStudentInfo->Init_Company_Student_Info($row_student);
                $info->Append_student_followed($info_student);
            }
        }
        else{
//            echo 'error'."<br>";
        }
        array_push($temp_array, $info);
    }
    $response['studentApplicationInfo'] = $temp_array;
}
//get all the job has posted


//get company info
$sql_company_info = "select * from Company where cname = ?;";
$company_info = $conn->prepare($sql_company_info);
$company_info->bind_param('s',$cname);
$company_info->execute();
$result_company_info = $company_info->get_result();
$temp_array2 = array();
if ($result_company_info->num_rows > 0){
    $temp_array3 = $result_company_info->fetch_assoc();
    $response['companyInfo'] = $temp_array3;
}

//return the results to frontend and close the connection to database.
echo json_encode($response);
$conn->close();
?>