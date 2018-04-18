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
$password = "";
$dbname = "jobster";

//create new connection and check if it is connected successfully.
$conn = new mysqli($servername, $dbusername, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
}
/*
CREATE TABLE `JobAnnouncement` (
`jid` VARCHAR(10) NOT NULL,
    `jlocation` VARCHAR(45) NULL,
    `jtitle` VARCHAR(45) NULL,
    `jsalary` VARCHAR(45) NULL,
    `jreq_diploma` VARCHAR(45) NULL,
    `jreq_experience` VARCHAR(45) NULL,
    `jreq_skills` VARCHAR(90) NULL,
    `jdescription` VARCHAR(200),
    PRIMARY KEY (`jid`)
);
*/
//get parameters from frontend.
//get company parameter.
$cname = $_POST['cname'];
//the job parameters.
$jid = $_POST['jid'];
$jlocation = $_POST['jlocation'];
$jtitle = $_POST['jsalary'];
$jreq_diploma = $_POST['jreq_diploma'];
$jreq_experience = $_POST['jreq_experience'];
$jreq_skills = $_POST['jskills'];
$jdescription = $_POST['jdescription'];

//update the JobAnnouncement and Notification table.
$sql_update_jobannouncement = "INSERT INTO JobAnnoncement (`jid`, `jlocation`, `jtitle`, `jreq_experience`, `jreq_skills`, `jreq_diploma`, `jdescription`)
VALUES ('$jid', '$jlocation', '$jtitle', '$jreq_experience', '$jreq_skills', '$jreq_diploma', '$jdescription');";
if (mysqli_query($conn, $sql_update_jobannouncement) == True){
    $response['Update_JobAnnouncement'] = "Update job announcement successfully.";
}
else{
    $response['Update_JobAnnouncement'] = "Database error:"."<br>"."$conn->error";
    header('HTTP/1.0 403 Forbidden');
}

/*
CREATE TABLE `Notification` (
`nid` VARCHAR(10) NOT NULL,
    `companysend` VARCHAR(45) NULL,
    `semailsend` VARCHAR(20) NULL,
    `semailreceive` VARCHAR(20)  NULL,
    `jid` VARCHAR(10)  NULL,
    `pushtime` date NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`nid`),
    FOREIGN key (`companysend`)
        REFERENCES `Company` (`cname`),
    FOREIGN key (`semailsend`)
        REFERENCES `Student` (`semail`),
    FOREIGN KEY (`semailreceive`)
        REFERENCES `Student` (`semail`),
    FOREIGN KEY (`jid`)
        REFERENCES `JobAnnouncement`(`jid`)
);
*/
$sql_student_followed = "SELECT semail from StudentFollowCompany where cname = $cname;";
$result_student_followed = mysqli_query($conn, $sql_student_followed);
if ($result_student_followed->num_rows > 0){
    while ($row = $result_student_followed->fetch_assoc()){
        $semailreceive = $row['semail'];
        $sql_update_notification = "INSERT INTO Notification (`companysend`, `semailreceive`, `jid`, `pushtime`, `status`)
        VALUES ('$cname', '$semailreceive', '$jid', CURRENT_DATE, 'unviewed');";
        if (mysqli_query($conn, $sql_update_notification) == True){
            array_push($response['send_notification_to_followed_student'],'$semailreceive');
        }
    }
    else{
        $response['send_notification_to_followed_student'] = "Database error:"."<br>"."$conn->error";
        header('HTTP/1.0 403 Forbidden');
    }
}
echo json_encode($response);
$conn->close();

?>