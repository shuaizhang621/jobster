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

//initialize response to frontend.
$reponse = array();

//insert tuple into backend database.
$sql_init_student_follow = "INSERT INTO StudentFollowCompany (`semail`,`cname`) VALUES (?, ?);";
$init_student_follow = $conn->prepare($sql_init_student_follow);
$init_student_follow->bind_param('ss',$semail,$cname);
if ($init_student_follow->execute()){
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