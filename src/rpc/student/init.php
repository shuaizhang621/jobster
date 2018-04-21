<?php
$semail = "cz1522@nyu.edu";
// $semail = $_POST['semail'];

//initial classes for feedback to frontend.
class class_response{
    public $friend_request;
    public $notification;
    public $personal_info;
    public function isEmpty()
    {
        return empty($this->friend_request) and empty($this->notification) and empty($this->personal_info);
    }
}

class personal_info{
    public $semail;
    public $skey;
    public $sphone;
    public $sfirstname;
    public $slastname;
    public $suniversity;
    public $smajor;
    public $sgpa;
    public $sresume;
}

function Build_personal_Info($row)
{
    $personalInfo = new personal_info();
    $personalInfo->seamil = $row['semail'];
    $personalInfo->skey = $row['skey'];
    $personalInfo->sphone = $row['sphone'];
    $personalInfo->sfirstname = $row['sfirstname'];
    $personalInfo->slastname = $row['slastname'];
    $personalInfo->suniversity = $row['suniversity'];
    $personalInfo->smajor = $row['smajor'];
    $personalInfo->sgpa = $row['sgpa'];
    $personalInfo->sresume = $row['sresume'];
    return $personalInfo;
}

class company_info{
    public $cname;
    public $ckey;
    public $cphone;
    public $cemail;
    public $cindustry;
    public $clocation;
    public $cdescription;
}

function Build_Company_Info($row)
{
    $companyInfo = new company_info();
    $companyInfo->ceamil = $row['cemail'];
    $companyInfo->ckey = $row['ckey'];
    $companyInfo->cphone = $row['cphone'];
    $companyInfo->cname = $row['cname'];
    $companyInfo->cindustry = $row['cindustry'];
    $companyInfo->clocation = $row['clocation'];
    $companyInfo->cdescription = $row['cdescription'];
    return $companyInfo;
}

class notification_info
{
    public $nid;
    public $companysend;
    public $semailsend;
    public $semailreceive;
    public $jid;
    public $pushtime;
    public $status;

}

function Build_Notification_Info($row)
{
    $notificationInfo = new notification_info();
    $notificationInfo ->nid = $row['nid'];
    $notificationInfo ->companysend = $row['companysend'];
    $notificationInfo ->semailsend = $row['semailsend'];
    $notificationInfo ->semailreceive = $row['semailreceive'];
    $notificationInfo ->jid = $row['jid'];
    $notificationInfo ->pushtime = $row['pushtime'];
    $notificationInfo ->status = $row['status'];
    return $notificationInfo;
}

class friend{
    public $semailsend;
    public $semailreceive;
    public $status;
    public $sendtime;
}

function Build_friend_request_Info($row){
    $friendRequestInfo = new friend();
    $friendRequestInfo->semailsend = $row['semailsend'];
    $friendRequestInfo->semailreceive = $row['semailreceive'];
    $friendRequestInfo->status = $row['status'];
    $friendRequestInfo->sendtime =$row['sendtime'];
    return $friendRequestInfo;
}

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

//initialize a object of class 'response' and temp array to feed the result back to frontend.
$response = new class_response();

//query personal infomation  from backend database.
$temp_array2 = array();
$sql_personal_info = "select * from Student where semail = '$semail';";
$result_personal_info = mysqli_query($conn, $sql_personal_info);

if  ($result_personal_info->num_rows > 0){
    while ($row = $result_personal_info->fetch_assoc()){
        $info = Build_personal_Info($row);
        array_push($temp_array2, $info);
    }
    $response->personal_info = $temp_array2;
    //echo json_encode($response_personal_info);
}

//query notifications of followed company and other students send from backend database.
$temp_array3 = array();
$sql_notification_unviewed = "select * from JobAnnouncement where jid in 
(Select jid from notification where semailreceive = '$semail' and status = 'unviewed');";
$result_notification_unviewed = mysqli_query($conn, $sql_notification_unviewed);
if  ($result_notification_unviewed->num_rows > 0){
    while ($row = $result_notification_unviewed->fetch_assoc()){
        $info = Build_Notification_Info($row);
        array_push($temp_array3, $info);
    }
    $response->notification = $temp_array3;
    //echo json_encode($response_personal_info);
}

//query pending student friend request
$temp_array = array();
$sql_pending_friend_request = "select * from student where semail in 
(select semail from studentfriends where semailreceive = '$semail' and status = 'unviewed');";
$result_pending_friend_request = mysqli_query($conn, $sql_pending_friend_request);
if ($result_pending_friend_request->num_rows > 0){
    while ($row = $result_pending_friend_request->fetch_assoc()){
        $info = Build_friend_request_Info($row);
        array_push($temp_array, $info);
    }
    $response->friend_request = $temp_array;
}

//response to frontend.
echo json_encode($response);

$conn->close();
?>
