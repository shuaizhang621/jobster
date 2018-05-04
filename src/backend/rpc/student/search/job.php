<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/12
 * Time: 21:13
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

// import the classes used in this file
require("../../../entity/classes.php");
$objectJobInfo = new job_info();

//get parameter from frontend.
$keyword = $_POST['keyword'];
$semail = $_POST['semail'];
//prevent injection
$keyword = $conn->real_escape_string($keyword);
$keyword = htmlspecialchars($keyword, ENT_QUOTES);
$semail = htmlspecialchars($semail, ENT_QUOTES);

//get token
$token = $_POST["token"];
//verify the token
require("../../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}

//initialize response to frontend.
$response = array();


//search companies that fit the keywords from backend database.
$sql_job_search = "select *  from  JobAnnouncement where jid LIKE '%$keyword%' or cname like '%$keyword%' or 
jtitle like '%$keyword%' or jsalary like '%$keyword%' or jreq_diploma like '%$keyword%' or 
jreq_experience like '%$keyword%' or jreq_skills like '%$keyword%' or jlocation like '%$keyword%' 
or jdescription like '%$keyword%';";
$result_job_search = mysqli_query($conn, $sql_job_search);

if  ($result_job_search->num_rows > 0){
    while ($row = $result_job_search->fetch_assoc()){
        $info = $objectJobInfo->Build_job_Info($row);
        array_push($response, $info);
    }
    echo json_encode($response);
}
else{
    header('HTTP/1.0 403 Forbidden');
    die('Cannot find job fits your keyword.');
}
$conn->close();
?>