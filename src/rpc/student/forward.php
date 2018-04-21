<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/13
 * Time: 18:17
 */

//the parameters that used for connecting to database.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

//get parameters from frontend
$nid = $_POST['nid'];
$semail = $_POST['semail'];
$semailreceive = $_POST['semailreceive'];
$jid = $_POST['jid'];

//update backend database
$sql_forward_update = "INSERT INTO notification (`nid`, `semailsend`, `semailreceive`, `jid`, `pushtime`, `status`)
values ('$nid', '$semail', '$semailreceive', '$jid', CURDATE(), 'unviewed')";

if (mysqli_query($conn, $sql_forward_update) == True){
    echo "Your forward has been sent successfully.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}
$conn->close();
?>