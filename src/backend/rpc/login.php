<?php
//login page,check if the username and keywords are valid.
$username = $_POST['username'];
$keywords = $_POST['keywords'];
$user_type = $_POST['usertype'];

if ($user_type == 'student') {
    $sql_check_username_exist = "select semail from Student where semail = '$username'";
    $sql_keywords_match = "select semail, skey from Student where semail = '$username' and skey = '$keywords';";
} else if ($user_type == 'company') {
    $sql_check_username_exist = "select cname from Company where cname = '$username'";
    $sql_keywords_match = "select cname, ckey from Company where cname = '$username' and ckey = '$keywords';";
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

$result_username_exist = mysqli_query($conn, $sql_check_username_exist);
if ($result_username_exist->num_rows > 0) {
    $result_keywords_match = mysqli_query($conn, $sql_keywords_match);
    if ($result_keywords_match->num_rows > 0) {
        $response = "Login successfully!";
    } else {
        header('HTTP/1.0 403 Forbidden');
        die('The keyword is not correct!');
    }
} else {
    header('HTTP/1.0 403 Forbidden');
    die("The username has not been registered.");
}

echo $response;