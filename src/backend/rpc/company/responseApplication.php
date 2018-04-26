<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/17
 * Time: 20:38
 */
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

//get parameters from the frontend.
$aid = $_POST['aid'];
$status = $_POST['status'];

//initialize the response to frontend.
$response = array();

//update the backend database.
$sql_update_application_accepted = "update studentapplyjob set status = '$status' where aid = '$aid';";
if (mysqli_query($conn, $sql_update_application_accepted) == True){
    $response['update_status'] = "Updated successfully.";
}
else
{
    header('HTTP/1.0 403 Forbidden');
    $reponse['update_status'] = "Database error:"."<br>"."$conn->error";
}
echo json_encode($repsonse);
$conn->close();
?>