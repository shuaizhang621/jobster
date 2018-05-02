<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/15
 * Time: 15:27
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
//get parameters from frontend.
$semailsend = $_POST['semailsend'];
$semailreceive = $_POST['semailreceive'];
$content = $_POST['content'];
//update the message to database.
$result_max_mid  = mysqli_query($conn,"select max(mid) as mmid from message;");
if ($result_max_mid->num_rows > 0){
    $mid = strval(intval($result_max_mid->fetch_assoc()['mmid']) + 1);
}
else{
    $mid = 1;
}
$sql_update_message = "INSERT INTO message (`mid`,`semailsend`, `semailreceive`, `content`, `sendtime`, `status`)
VALUES  ('$mid',?,?,?, CURRENT_DATE, 'unviewed');";
$update_message = $conn->prepare($sql_update_message);
$update_message->bind_param('sss', $semailsend,$semailreceive, $content);
if ($update_message->execute()){
    echo "Your message to ".$semailreceive." has been sent.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}
$conn->close();
?>
