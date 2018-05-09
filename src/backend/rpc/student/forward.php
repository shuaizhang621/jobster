<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/13
 * Time: 18:17
 */
//forward test data
/*
$nid = 11;
$semail = 'cz1522@nyu.edu';
$semailreceive = 'qy1449@nyu.edu';
$jid = 2;
*/

ini_set('display_errors', true);
error_reporting(E_ALL);
//the parameters that used for connecting to database.
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

//get parameters from frontend
$semail = $_POST['semail'];
$semailreceive = $_POST['semailreceive'];
$jid = $_POST['jid'];
echo "*****";
echo gettype($_POST['semailreceive'][0]);
//prevent xss attack
$semail = htmlspecialchars($semail, ENT_QUOTES);
$jid = htmlspecialchars($jid, ENT_QUOTES);
//foreach($semailreceive as $student){
//    $student = htmlspecialchars($student, ENT_QUOTES);
//}

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
// get nid
//$result_max_nid  = mysqli_query($conn,"select max(nid) as mnid from notification;");
//if ($result_max_nid->num_rows > 0) {
//    $nid = strval(intval($result_max_nid->fetch_assoc()['mnid']) + 1);
//}
//else{
//    $nid = 1;
//}

//update backend database
/*
$sql_forward_update = "INSERT INTO notification (`nid`, `semailsend`, `semailreceive`, `jid`, `pushtime`, `status`)
values ('$nid', '$semail', '$semailreceive', '$jid', CURDATE(), 'unviewed')";

if (mysqli_query($conn, $sql_forward_update) == True){
    echo "Your forward has been sent successfully.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}
*/
foreach ($semailreceive as $student){
    $result_max_nid  = mysqli_query($conn,"select max(nid) as mnid from notification;");
    if ($result_max_nid->num_rows > 0){
        $nid = strval(intval($result_max_nid->fetch_assoc()['mnid']) + 1);
    }
    else{
        $nid = 1;
    }
//    echo $nid."<br>";
    $sql_post_selected_student = "INSERT INTO notification(`nid`, `semailsend`, `semailreceive`, `jid`, `pushtime`, `status`)
    VALUES ('$nid', ?, ?, ?, CURDATE(), 'unviewed');";
    $post_selected_student = $conn->prepare($sql_post_selected_student);
    $post_selected_student->bind_param('sss',$semail,$student["semail"], $jid);
    if ($post_selected_student->execute()){
        $response[$student["semail"]] = $student." Updated successfully.";
    }
    else{
        $response[$student["semail"]] = $student." Updated unsuccessfully.";
    }
}
echo json_encode($response);
$conn->close();
?>