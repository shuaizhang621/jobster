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
    VALUES ('$nid', '$semail', '$student', '$jid', CURDATE(), 'unviewed');";
    if (mysqli_query($conn, $sql_post_selected_student) == True){
        $response[$student] = $student." Updated successfully.";
    }
    else{
        $response[$student] = $student." Updated unsuccessfully.";
    }
    echo $response;
}
$conn->close();
?>