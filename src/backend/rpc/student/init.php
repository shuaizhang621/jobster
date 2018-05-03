<?php
//get parameters from frontend
//$semail = "cz1522@nyu.edu";
$semail = $_POST['semail'];
// import the classes used in this file
require("../../entity/classes.php");
$objectJobInfo = new job_info();
$objectStudentInfo = new personal_info();
//initial classes for feedback to frontend.
class class_response{
    public $friend_request;
    public $notification;
    public $personal_info;
    public $friends;
    public function isEmpty()
    {
        return empty($this->friend_request) and empty($this->notification) and empty($this->personal_info);
    }
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

//initialize a object of class 'response' and temp array to feed the result back to frontend.
$response = new class_response();

//query personal infomation  from backend database.
$temp_array2 = array();
$sql_personal_info = "select * from Student where semail = '$semail';";
$result_personal_info = mysqli_query($conn, $sql_personal_info);

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
(Select jid from notification where semailreceive = '$semail' and status = 'unviewed');";
$result_notification_unviewed = mysqli_query($conn, $sql_notification_unviewed);
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
$sql_pending_friend_request = "select * from student where semail in 
(select semailsend from studentfriends where semailreceive = '$semail' and status = 'unviewed');";
$result_pending_friend_request = mysqli_query($conn, $sql_pending_friend_request);
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
$sql_pending_friend_request = "select * from student where semail in 
(select semailsend from studentfriends where semailreceive = '$semail' and status = 'Accepted') 
or semail in (select semailreceive from StudentFriends where semailsend = '$semail' and status = 'Accepted');";
$result_pending_friend_request = mysqli_query($conn, $sql_pending_friend_request);
if ($result_pending_friend_request->num_rows > 0){
    while ($row = $result_pending_friend_request->fetch_assoc()){
        $info = $objectStudentInfo->Build_personal_Info($row);
        array_push($temp_array4, $info);
    }
    $response->friends = $temp_array4;
}
else{
    $response->friends = [];
}

//response to frontend.
echo json_encode($response);

$conn->close();
?>
