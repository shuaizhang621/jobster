<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/15
 * Time: 16:54
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

//get parameters from frontend.
$mid = $_POST['mid'];
//initialize response to frontend.
$response = array();
//update the notification status to 'viewed' at backend database.
$sql_update_message = "update message set status = 'viewed' where mid = '$mid';";

if (mysqli_query($conn, $sql_update_message) == True){
    $response['update_status'] = True;
    $response['update_statement'] = "Message has been update to viewed.";
    echo $response;
}
else{
    header('HTTP/1.0 403 Forbidden');
    $response ['update_status'] = True;
    $response['update_statement'] = "Database error:"."<br>".$conn->error;
    echo $response;
}
$conn->close();
?>