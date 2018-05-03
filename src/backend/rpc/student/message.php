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
$semailsend = $_POST['semailsend'];//"cz1522@nyu.edu";//
$semailreceive = $_POST['semailreceive'];//"dx1368@nyu.edu";//
$content = $_POST['content'];//"abc";//
//update the message to database.
$result_max_mid  = mysqli_query($conn,"select max(mid) as mmid from message;");
if ($result_max_mid->num_rows > 0){
    $mid = strval(intval($result_max_mid->fetch_assoc()['mmid']) + 1);
}
else{
    $mid = 1;
}
$sql_update_messge = "INSERT INTO message (`mid`,`semailsend`, `semailreceive`, `content`, `sendtime`, `status`)
VALUES  ('$mid','$semailsend', '$semailreceive', '$content', CURRENT_DATE, 'unviewed');";
if (mysqli_query($conn, $sql_update_messge) == True){
    echo "Your message to ".$semailreceive." has been sent.";
}
else{
    header('HTTP/1.0 403 Forbidden');
    echo "Database error:"."<br>"."$conn->error";
}
$conn->close();
?>
