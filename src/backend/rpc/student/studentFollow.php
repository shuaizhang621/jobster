<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/23
 * Time: 21:43
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

//get parameter from frontend.
$semail = $_POST['semail'];
$cname = $_POST['cname'];

//initialize response to frontend.
$reponse = array();

//insert tuple into backend database.
$sql_init_student_follow = "INSERT INTO StudentFollowCompany (`semail`,`cname`) VALUES ('$semail', '$cname');";
if (mysqli_query($conn, $sql_init_student_follow) == True){
    $response['Insert status'] = True;
    $response['Insert content'] = $semail." has followed ".$cname;
}
else {
    $response['Insert status'] = False;
    $response['Insert content'] =  "Database error:"."<br>"."$conn->error";
}

echo json_encode($response);
$conn->close();
?>