<?php
// add classes of notification and its initialization function
class notification_info
{
    public $nid;
    public $companysend;
    public $semailsend;
    public $semailreceive;
    public $jid;
    public $pushtime;

}

function Build_Notification_Info($row)
{
    $notificationInfo = new notification_info();
    $notificationInfo -> nid = $row['cemail'];
    $notificationInfo -> companysend = $row['companysend'];
    $notificationInfo -> semailsend = $row['semailsend'];
    $notificationInfo -> semailreceive = $row['semailreceive'];
    $notificationInfo -> jid = $row['jid'];
    $notificationInfo -> pushtime = $row['pushtime'];
    return $notificationInfo;
}

$response = array();
$response['send_notification_to_followed_student'] = array();
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

//get parameters from frontend.
//get company parameter.
$cname = $_POST['cname'];
//the job parameters.
$jlocation = $_POST['jlocation'];
$jtitle = $_POST['jtitle'];
$jsalary = $_POST['jsalary'];
$jreq_diploma = $_POST['jreq_diploma'];
$jreq_experience = $_POST['jreq_experience'];
$jreq_skills = $_POST['jskills'];
$jdescription = $_POST['jdescription'];

//create jid.
$result_max_jid  = mysqli_query($conn,"select max(jid) as mjid from JobAnnouncement;");
if ($result_max_jid->num_rows > 0){
    $jid = strval(intval($result_max_jid->fetch_assoc()['mjid']) + 1);
}
else{
    $jid = 1;
}

//update the JobAnnouncement and Notification table.
$sql_update_jobannouncement = "INSERT INTO JobAnnouncement (`jid`, `jlocation`, `jtitle`, `jreq_experience`, `jreq_skills`, `jreq_diploma`, `jdescription`)
VALUES ('$jid', '$jlocation', '$jtitle', '$jreq_experience', '$jreq_skills', '$jreq_diploma', '$jdescription');";
if (mysqli_query($conn, $sql_update_jobannouncement) == True){
    $response['Update_JobAnnouncement'] = "Update job announcement successfully.".$jid;
}
else{
    $response['Update_JobAnnouncement'] = "Database error:"."<br>".$conn->error;
    header('HTTP/1.0 403 Forbidden');
}

$result_max_nid  = mysqli_query($conn,"select max(nid) as mnid from notification;");
if ($result_max_nid->num_rows > 0){
    $nid = strval(intval($result_max_nid->fetch_assoc()['mnid']) + 1);
}
else{
    $nid = 1;
}
$sql_student_followed = "SELECT semail from StudentFollowCompany where cname = '$cname';";
$result_student_followed = mysqli_query($conn, $sql_student_followed);
if ($result_student_followed->num_rows > 0) {
    while ($row = $result_student_followed->fetch_assoc()) {
        $semailreceive = $row['semail'];
        $sql_update_notification = "INSERT INTO Notification (`nid`,`companysend`, `semailreceive`, `jid`, `pushtime`, `status`)
        VALUES ('$nid','$cname', '$semailreceive', '$jid', CURRENT_DATE, 'unviewed');";
        if (mysqli_query($conn, $sql_update_notification) == True) {
            array_push($response['send_notification_to_followed_student'], $semailreceive);
        }
    }
}
else{
    $response['send_notification_to_followed_student'] = "Database error:"."<br>"."$conn->error";
    header('HTTP/1.0 403 Forbidden');
}

echo json_encode($response);
$conn->close();
?>