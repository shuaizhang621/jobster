<?php

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
$jreq_skills = $_POST['jreq_skills'];
$jdescription = $_POST['jdescription'];
//prevent xss attack.
$cname = htmlspecialchars($cname, ENT_QUOTES);
$jlocation = htmlspecialchars($jlocation, ENT_QUOTES);
$jtitle = htmlspecialchars($jtitle, ENT_QUOTES);
$jsalary = htmlspecialchars($jsalary, ENT_QUOTES);
$jreq_diploma = htmlspecialchars($jreq_diploma, ENT_QUOTES);
$jreq_experience = htmlspecialchars($jreq_experience, ENT_QUOTES);
$jreq_skills = htmlspecialchars($jreq_skills, ENT_QUOTES);
$jdescription = htmlspecialchars($jdescription, ENT_QUOTES);

//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $cname)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}


//create jid.
$result_max_jid  = mysqli_query($conn,"select max(jid) as mjid from JobAnnouncement;");
if ($result_max_jid->num_rows > 0){
    $jid = strval(intval($result_max_jid->fetch_assoc()['mjid']) + 1);
}
else{
    $jid = 1;
}

//update the JobAnnouncement and Notification table.
$sql_update_jobannouncement = "INSERT INTO JobAnnouncement (`jid`, `cname`,`jlocation`, `jtitle`,`jsalary`,
 `jreq_experience`, `jreq_skills`, `jreq_diploma`, `jdescription`)
VALUES (?, ?,?,?, ?,?, ?, ?, ?);";
$update_jobannouncement = $conn->prepare($sql_update_jobannouncement);
$update_jobannouncement->bind_param('sssssssss',$jid, $cname, $jlocation, $jtitle, $jsalary, $jsalary,
     $jreq_experience,  $jreq_skills, $jreq_diploma, $jdescription);
if ($update_jobannouncement->execute()){
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
$sql_student_followed = "SELECT semail from StudentFollowCompany where cname = ?;";
$student_followed = $conn->prepare($sql_student_followed);
$student_followed->bind_param('s', $cname);
$student_followed->execute();
$result_student_followed = $student_followed->get_result();
if ($result_student_followed->num_rows > 0) {
    while ($row = $result_student_followed->fetch_assoc()) {
        $semailreceive = $row['semail'];
        $sql_update_notification = "INSERT INTO Notification (`nid`,`companysend`, `semailreceive`, `jid`, `pushtime`, `status`)
        VALUES ('$nid',?, ?, ?, CURRENT_DATE, 'unviewed');";
        $update_notification = $conn->prepare($sql_update_notification);
        $update_notification->bind_param('sss',$cname, $semailreceive, $jid);
        if ($update_notification->execute()) {
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