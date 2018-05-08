<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/13
 * Time: 13:21
 */

// import the classes used in this file
require("../../../entity/classes.php");
$objectStudentInfo = new personal_info();
$objectRestrictedStudentInfo = new student_info_restircted();

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

//get parameter forntend.
$semail = $_POST['semail'];
$keyword = $_POST['keyword'];

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

//query from backend database which fit the keywords.
$sql_search_student = "select * from Student where semail like '%$keyword%' or  sphone like '%$keyword%' or  
sfirstname like '%$keyword%' or  slastname like '%$keyword%' or suniversity like '%$keyword%' or 
smajor  like '%$keyword%';";

$result_search_student = mysqli_query($conn, $sql_search_student);
    if  ($result_search_student->num_rows > 0){
        while ($row = $result_search_student->fetch_assoc()){
            if ($row['sprivacy'] == True) {
                $info = $objectStudentInfo->Build_personal_Info($row);
                array_push($response, $info);
                //            $response[$row['semail']] = $info;
            }
            else{
                $info = $objectRestrictedStudentInfo->Build_student_info_restricted($row);
                array_push($response, $info);
            }
        }
        echo json_encode($response);
    }
    else {
        header('HTTP/1.0 403 Forbidden');
        die('Cannot find student that fit your keyword.');
    }
$conn->close();
?>
