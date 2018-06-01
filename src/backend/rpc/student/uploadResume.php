<?php
ini_set('display_errors', true);
error_reporting(E_ALL);

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
$semail = $_POST["semail"];

//get token
$token = $_POST["token"];

//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}

if ( 0 < $_FILES['file']['error'] ) {
    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
}
else {
    $destination = 'uploads/' . $_FILES['file']['name'];
    move_uploaded_file($_FILES['file']['tmp_name'], $destination);
}

//save file path to backend database.
$sql_save_path = "update student set sresume = '$destination' WHERE semail = '$semail';";
if(mysqli_query($conn, $sql_save_path) == True){
    $response = "Upload successfully!";
}
else{
    $response = "Upload unsuccessfully!";
}
echo $response;
$conn->close();
