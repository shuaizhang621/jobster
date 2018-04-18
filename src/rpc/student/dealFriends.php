<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/13
 * Time: 15:59
 */

//the parameters that used for connecting to database.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}

//get parameter from frontend.
$send = $_POST['send'];
$receive = $_POST['receive'];
$choice = $_POST['choice'];

//update the status based on what choice has been made by the receiver.
if ($choice == "Accepted"){
$sql_update_friend_status = "UPDATE StudentFriends SET status = 'Accepted' where semailsend = '$send' 
and semailreceive = '$receive';";
    if (mysqli_query($conn, $sql_update_friend_status) == True ){
        echo $receive."accepted your friend request.";
    }
    else{
        header('HTTP/1.0 403 Forbidden');
        echo "Database error:"."\"<br>\".$conn->error";
    }

}
elseif ($choice == "Denied"){
$sql_update_friend_status = "DELETE FROM StudentFriends WHERE semailsend = '$send' and semailreceive = '$receive';";
    if (mysqli_query($conn, $sql_update_friend_status) == True){
        echo $receive." denied your request.";
    }
    else{
        header('HTTP/1.0 403 Forbidden');
        echo "Database error:"."\"<br>\".$conn->error";
    }
}
else{
    //$response = "invalid value of choice.";
    //echo $response;
    //echo json.encode($response);
    header('HTTP/1.0 403 Forbidden');
    die('Invalid value of choice.');

}
$conn->close();
?>