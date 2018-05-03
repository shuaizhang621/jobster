<?php

//This script is used to update the register information to backend database.

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

//test data
// $user_type = 'student';
// $semail = 'rh1514@nyu.edu';
// $skey = '12345678';
// $sfirstname = "Rui";
// $slastname = 'Hai';
// $sgpa = '4.0';
// $sphone = '1521158711';
// $suniversity = 'New York University';
// $smajor = 'POL';
// $sresume = 'xxxxxx';
// $sql_update = "INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
// 					   VALUES ('$semail', '$skey', '$sphone', '$sfirstname', '$slastname', '$suniversity', '$smajor', '$sgpa', '$sresume')";


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

    //prevent xss attack.
    $semail = htmlspecialchars($semail, ENT_QUOTES);
    $skey = htmlspecialchars($skey, ENT_QUOTES);
    $sfirstname = htmlspecialchars($sfirstname, ENT_QUOTES);
    $slastname = htmlspecialchars($slastname, ENT_QUOTES);
    $sgpa = htmlspecialchars($sgpa, ENT_QUOTES);
    $sphone = htmlspecialchars($sphone, ENT_QUOTES);
    $suniversity = htmlspecialchars($suniversity, ENT_QUOTES);
    $smajor = htmlspecialchars($smajor, ENT_QUOTES);
    $sresume = htmlspecialchars($sresume, ENT_QUOTES);

    $sql_update = "INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
					   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? )";
    $register_update = $conn->prepare($sql_update);
    $register_update->bind_param('sssssssss',$semail,$skey, $sphone, $sfirstname, $slastname, $suniversity, $smajor, $sgpa, $sresume);
    // $register_update->execute();
    // $update = $register_update->get_result();
} else if ($user_type == 'company') {
    $cname = $_POST['cname'];
    $ckey = $_POST['ckey'];
    $clocation = $_POST['clocation'];
    $cemail = $_POST['cemail'];
    $cphone = $_POST['cphone'];
    $cindustry = $_POST['cindustry'];
    $cdescription = $_POST['cdescription'];

    //prevent xss attack.
    $cname = htmlspecialchars($cname, ENT_QUOTES);
    $ckey = htmlspecialchars($ckey, ENT_QUOTES);
    $clocation = htmlspecialchars($clocation, ENT_QUOTES);
    $cemail = htmlspecialchars($cemail, ENT_QUOTES);
    $cphone = htmlspecialchars($cphone, ENT_QUOTES);
    $cindustry = htmlspecialchars($cindustry, ENT_QUOTES);
    $cdescription = htmlspecialchars($cdescription, ENT_QUOTES);

    $sql_update = "INSERT INTO `Company` (`cname`, `ckey`, `cemail`, `clocation`, `cphone`, `cindustry`, `cdescription`)
					   VALUES (?, ?, ?, ?, ?, ?, ?);";
    $register_update = $conn->prepare($sql_update);
    $register_update->bind_param('sssssss',$cname,$ckey, $cemail, $clocation, $cphone, $cindustry, $cdescription);
//     $register_update->execute();
//     $update = $register_update->get_result();
 }
// echo $update->num_rows."<br>";

//$check_update = mysqli_query($conn, $sql_check_update);
    if ($register_update->execute()) {
        $response = "You have registered successfully!";
        echo json_encode($response);
        //echo json_encode($response);
    } else {
        header('HTTP/1.0 403 Forbidden');
        $response = "ERROR: ".$update."<br>".$conn->error;
        //echo $response;
        echo json_encode($response);
    }
    $conn->close();
?>