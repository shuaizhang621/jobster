<?php

//This script is used to update the register information to backend database.
/*
//test data
$user_type = 'student';
$semail = 'rh1514@nyu.edu';
$skey = '12345678';
$sfirstname = "Rui";
$slastname = 'Hai';
$sgpa = '4.0';
$sphone = '1521158711';
$suniversity = 'New York University';
$smajor = 'POL';
$sresume = 'xxxxxx';
$sql_update = "INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
					   VALUES ('$semail', '$skey', '$sphone', '$sfirstname', '$slastname', '$suniversity', '$smajor', '$sgpa', '$sresume')";
*/

//Fisrt check the user type: student user or company user.Then get parameter from frontend.
$user_type = $_POST['usertype'];
if ($user_type == 'student'){
    $semail = $_POST['semail'];
    $skey = $_POST['skey'];
    $sfirstname = $_POST['sfirstname'];
    $slastname = $_POST['slastname'];
    $sgpa = $_POST['sgpa'];
    $sphone = $_POST['sphone'];
    $suniversity = $_POST['university'];
    $smajor = $_POST['smajor'];
    $sresume = $_POST['sresume'];
    $sql_update = "INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
					   VALUES ('$semail', '$skey', '$sphone', '$sfirstname', '$slastname', '$suniversity', '$smajor', '$sgpa', '$sresume')";

} else if ($user_type == 'company') {
    $cname = $_POST['cname'];
    $ckey = $_POST['ckey'];
    $clocation = $_POST['clocation'];
    $cemail = $_POST['cemail'];
    $cphone = $_POST['cphone'];
    $cindusty = $_POST['cindustry'];
    $cdescription = $_POST['cdescription'];
    $sql_update = "INSERT INTO `Company` (`cname`, `ckey`, `cemail`, `clocation`, `cphone`, `cindusty`, `cdescription`)
					   VALUES ('$cname', '$ckey', '$cemail', '$clocation', '$cphone', '$cindusty', '$cdescription');";
}

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
//$check_update = mysqli_query($conn, $sql_check_update);
if ($update = mysqli_query($conn, $sql_update) == True) {
    $response = "You have registered successfully!";
    echo $response;
    //echo json_encode($response);
} else {
    header('HTTP/1.0 403 Forbidden');
    $response = "ERROR: ".$update."<br>".$conn->error;
    //echo $response;
    echo json_encode($response);
}
$conn->close();