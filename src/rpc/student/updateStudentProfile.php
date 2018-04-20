<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/20
 * Time: 14:13
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
$semail = $_POST['semail'];
$sgpa = $_POST['sgpa'];
$sphone = $_POST['sphone'];
$suniversity = $_POST['university'];
$smajor = $_POST['smajor'];
$sresume = $_POST['sresume'];

//initialize response to frontend.
$response = array();

//update personal information to backend database.
$sql_update_personal_info = "update student set sgpa = '$sgpa', sphone = '$sphone', suniversity = '$suniversity', smajor = '$smajor', sresume = '$resume'
where semail = '$semail';";
if (mysqli_query($conn, $sql_update_personal_info) == True){
    $response['update_personal_info'] = 'Updated successfully!';
}
else{
    $response = "ERROR: ".$update."<br>".$conn->error;
}
echo json_encode($response);
$conn->close();
?>