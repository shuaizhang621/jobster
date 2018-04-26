<?php
//this script is used to check the validation of the email of registration or check if it has been already used before.
//Get the parameter from forntend based on wheater it is a student user or a company user.
$user_type = $_POST['usertype'];
//testdata
//already exist
//$reg_username = 'dx1368@nyu.edu';
//$user_type = 'student';
//not exist
//$reg_username = 'rh1514@nyu.edu';
//$user_type = 'student';
if ($user_type == 'student')
{
//    echo 'student';
    $reg_username = $_POST['semail'];
    $sql_check_double_email = "select semail from Student where semail = '$reg_username'";
}
elseif ($user_type == 'company') {
//    echo 'company';
    $reg_username =$_POST['cname'];
    $sql_check_double_email = "select cname from Company where cname = '$reg_username'";
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
$double_check  = mysqli_query($conn, $sql_check_double_email);
if ($double_check->num_rows > 0)
{
//    echo "This username has been occupied. Please choose another one!";
    header('HTTP/1.0 403 Forbidden');
    die('This username has been occupied!');
}
else
{
//    echo "You can register with this username!";
    $response = "You can register with this username!";
    echo json_encode($response);
}
$conn->close();