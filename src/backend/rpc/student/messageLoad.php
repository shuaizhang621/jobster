<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/5/1
 * Time: 12:52
 */
// import classes needed in this script.
require("../../entity/classes.php");
$object_message_info = new message();

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
$semail = $_POST['semail'];
$semailreceive = $_POST['semailreceive'];
//prevent xss attack.
$semail = htmlspecialchars($semail, ENT_QUOTES);
$semailreceive = htmlspecialchars($semailreceive, ENT_QUOTES);
//initialize response
$response = array();

//query all the messages whose sender or receiver is semail.
$sql_get_messages = "select * from message where (semailsend = ? and semailreceive = ?) 
or (semailsend = ? and semailreceive = ?);";
$get_messages = $conn->prepare($sql_get_messages);
$get_messages->bind_param('ssss',$semail, $semailreceive, $semailreceive, $semail);
$get_messages->execute();
$result_get_messages = $get_messages->get_result();
if ($result_get_messages->num_rows > 0){
    while ($row = $result_get_messages->fetch_assoc()){
        $messageInfo = $object_message_info->Build_message_info($row);
        array_push($response, $messageInfo);
    }
}

echo json_encode($response);
$conn->close();
?>