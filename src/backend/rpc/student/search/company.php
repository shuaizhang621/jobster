<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/12
 * Time: 20:58
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
$objectCompanyInfo = new company_info();
$objectJobInfo = new job_info();

//get parameter from frontend.
$semail = $_POST['semail'];
$keyword = $_POST['keyword'];
// prevent injection and xss injection.
$keyword = $conn->real_escape_string($keyword);
$keyword = htmlspecialchars($keyword,ENT_QUOTES);
$semail = htmlspecialchars($semail, ENT_QUOTES);

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

$sql_company_search = "select * from  Company where (cname LIKE '%$keyword%') or (clocation like '%$keyword%') 
or (cindustry like '%$keyword%') or (cemail like '%$keyword%') or (cphone like '%$keyword%') 
or (cdescription like '%$keyword%') ;";

$result_company_search = mysqli_query($conn, $sql_company_search);


$temp_array =array();
if ($result_company_search->num_rows > 0){
    while ($row = $result_company_search->fetch_assoc()){
        $info = $objectCompanyInfo->Build_Company_Info($row);
        $temp_cname = $row['cname'];
//        echo $temp_jid."<br>";
        $sql_job_of_company = "select * from JobAnnouncement where cname = '$temp_cname';";
        $result_job_of_company = mysqli_query($conn, $sql_job_of_company);
        if($result_job_of_company->num_rows > 0){
            //echo 'got student'."<br>";
            while ($row_job = $result_job_of_company->fetch_assoc()){
                $info_job = $objectJobInfo->Build_Job_Info($row_job);
                $info->add_Jobs($info_job);
            }
        }
        else{
//            echo 'error'."<br>";
        }
        array_push($temp_array, $info);
    }
    $response = $temp_array;
}
echo json_encode($response);
$conn->close();
?>