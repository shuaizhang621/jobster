<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/13
 * Time: 16:27
 */

//the parameters that used for connecting to database.
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

//get parameter from frontend.
$send = $_POST['send'];
$receive = $_POST['receive'];

//check if the sender and receiver are already friends.If not, then update the backend database table StudentFriends.
$sql_send_friend_check = "select * from StudentFriends where (semailsend = '$send' and semailreceive = '$receive') 
or (semailsend = '$receive' and semailreceive = '$send');";

$result_send_friend_check = mysqli_query($conn, $sql_send_friend_check);
if ($result_send_friend_check->num_rows > 0){
    $row = $result_send_friend_check->fetch_assoc();
    if ($row['status']  == 'unviewed'){
        $response = "Your request is still being pending.";
    }
    else {
        $response = "You are already friends.";
        //echo $response;
    }
    echo json_encode($response);
}
else{
    $sql_insert_send_friend = "INSERT INTO StudentFriends (`semailsend`, `semailreceive`, `status`, `sendtime`) 
VALUES ('$send', '$receive', 'unviewed', CURDATE());";
    mysqli_query($conn, $sql_insert_send_friend);
    $result_check_insert = mysqli_query($conn, $sql_send_friend_check);
    if ($result_check_insert->num_rows > 0){
        $response = "Your friend request has been sent.";
        //echo $response;
        echo json_encode($response);
    }
    else{
        //$response = "Your friend request has not been sent.";
        //echo $response;
        //echo json_encode($response);
        header('HTTP/1.0 403 Forbidden');
        die("Your friend request has not been sent.");

    }
}
?>