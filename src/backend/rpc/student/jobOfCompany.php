<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/26
 * Time: 16:59
 */

// import the classes used in this file
require("../../entity/classes.php");
$objectJobInfo = new job_info();

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
$response = array();

$sql_job_of_company = "select * from JobAnnouncement where cname = ?;";
$job_of_company = $conn->prepare($sql_job_of_company);
$job_of_company->bind_param('s',$cname);
$job_of_company->execute();
$result_sql_job_of_company = $job_of_company->get_result();
if ($result_sql_job_of_company->num_rows > 0){
    while ($row = $result_sql_job_of_company->fetch_assoc()){
        $info = $objectJobInfo->Build_Job_Info($row);
        array_push($response, $info);
    }
}
echo json_encode($response);
$conn->close();
?>