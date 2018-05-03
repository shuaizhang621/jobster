<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/17
 * Time: 23:51
 */
// import the classes used in this file
require("../../entity/classes.php");
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

//getparameters from frontend.
$cname = $_POST['cname'];
$jid = $_POST['jid'];
$student_array = $_POST['student_array'];
//prevent xss attack
$cname = htmlspecialchars($cname, ENT_QUOTES);
$jid = htmlspecialchars($jid, ENT_QUOTES);
foreach ($student_array as $student) {
    $student = htmlspecialchars($student, ENT_QUOTES);
}

//initialize array for feedback to frontend.
$response = array();

//query all the student that followed and update notification

foreach ($student_array as $student){
    $result_max_nid  = mysqli_query($conn,"select max(nid) as mnid from notification;");
    if ($result_max_nid->num_rows > 0){
        $nid = strval(intval($result_max_nid->fetch_assoc()['mnid']) + 1);
    }
    else{
        $nid = 1;
    }
    
    $sql_post_selected_student = "INSERT INTO notification(`nid`, `companysend`, `semailreceive`, `jid`, `pushtime`, `status`)
    VALUES ('$nid', ?, ?, ?, CURDATE(), 'unviewed');";
    $post_selected_student = $conn->prepare($sql_post_selected_student);
    $post_selected_student->bind_param('sss',$cname, $student, $jid);
    if ($post_selected_student->execute()){
        $response[$student] = $student."Updated successfully.";
    }
    else{
        $response[$student] = $student."Updated unsuccessfully.";
    }
}

echo json_encode($response);
$conn->close();
?>