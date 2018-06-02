<?php
//get parameters from frontend
//$semail = "cz1522@nyu.edu";
$semail = $_POST['semail'];

 //prevent xss attack
$semail = htmlspecialchars($semail, ENT_QUOTES);

// import the classes used in this file
require("../../entity/classes.php");
$objectJobInfo = new job_info();
$objectStudentInfo = new personal_info();
//initialize a object of class 'response' and temp array to feed the result back to frontend.
$response = new class_response();

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

$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $semail)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}


//query personal infomation  from backend database.
$temp_array2 = array();
$sql_personal_info = "select * from Student where semail = ?;";
$personal_info = $conn->prepare($sql_personal_info);
$personal_info->bind_param('s', $semail);
$personal_info->execute();
$result_personal_info = $personal_info->get_result();

if  ($result_personal_info->num_rows > 0){
    while ($row = $result_personal_info->fetch_assoc()){
        $info = $objectStudentInfo->Build_personal_Info($row);
        array_push($temp_array2, $info);
    }
    $response->personal_info = $temp_array2;
    //echo json_encode($response_personal_info);
}
else{
    $response->personal_info=[];
}

//query notifications of followed company and other students send from backend database.
$temp_array3 = array();
$sql_notification_unviewed = "select * from JobAnnouncement where jid in 
<<<<<<< HEAD
(Select jid from Notification where semailreceive = ? and status = 'unviewed');";
=======
(Select jid from notification where semailreceive = ? and status = 'unviewed') ORDER BY posttime DESC;";
>>>>>>> 370b169c2ee3459f3e29c71de9ce24536e63f3d4
$notification_unviewed = $conn->prepare($sql_notification_unviewed);
$notification_unviewed->bind_param('s',$semail);
$notification_unviewed->execute();
$result_notification_unviewed = $notification_unviewed->get_result();
if  ($result_notification_unviewed->num_rows > 0){
    while ($row = $result_notification_unviewed->fetch_assoc()){
        $info = $objectJobInfo->Build_Job_Info($row);
        array_push($temp_array3, $info);
    }
    $response->notification = $temp_array3;
    //echo json_encode($response_personal_info);
}
else{
    $response->notification = [];
}

//query pending student friend request
$temp_array = array();
$sql_pending_friend_request = "select * from Student where semail in 
<<<<<<< HEAD
(select semailsend from StudentFriends where semailreceive = ? and status = 'unviewed');";
$sql_pending_friend_request = "select * from Student where semail in 
(select semailsend from StudentFriends where semailreceive = '$semail' and status = 'unviewed');";
=======
(select semailsend from studentfriends where semailreceive = ? and status = 'unviewed');";
>>>>>>> 370b169c2ee3459f3e29c71de9ce24536e63f3d4
$pending_friend_request = $conn->prepare($sql_pending_friend_request);
$pending_friend_request->bind_param('s', $semail);
$pending_friend_request->execute();
$result_pending_friend_request = $pending_friend_request->get_result();
if ($result_pending_friend_request->num_rows > 0){
    while ($row = $result_pending_friend_request->fetch_assoc()){
        $info = $objectStudentInfo->Build_personal_Info($row);
        array_push($temp_array, $info);
    }
    $response->friend_request = $temp_array;
}
else{
    $response->friend_request = [];
}

//query friends of a student
$temp_array4 = array();
$sql_friend_list = "select * from Student where semail in 
(select semailsend from StudentFriends where semailreceive = ? and status = 'Accepted') 
or semail in (select semailreceive from StudentFriends where semailsend =? and status = 'Accepted');";
$friend_list = $conn->prepare($sql_friend_list);
$friend_list->bind_param('ss',$semail,$semail);
$friend_list->execute();
$result_friend_list = $friend_list->get_result();
if ($result_friend_list->num_rows > 0){
    while ($row = $result_friend_list->fetch_assoc()){
        $info = $objectStudentInfo->Build_personal_Info($row);
        array_push($temp_array4, $info);
    }
    $response->friends = $temp_array4;
}
else{
    $response->friends = [];
}

$response->token = $token;

//response to frontend.
echo json_encode($response);

$conn->close();
?>
