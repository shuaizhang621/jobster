<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/17
 * Time: 23:51
 */
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
    $personalInfo->semail = $row['semail'];
    $personalInfo->sphone = $row['sphone'];
    $personalInfo->sfirstname = $row['sfirstname'];
    $personalInfo->slastname = $row['slastname'];
    $personalInfo->suniversity = $row['suniversity'];
    $personalInfo->smajor = $row['smajor'];
    $personalInfo->sgpa = $row['sgpa'];
    $personalInfo->sresume = $row['sresume'];
    return $personalInfo;
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

//getparameters from frontend.
$cname = $_POST['cname'];
$jid = $_POST['jid'];
$student_array = $_POST['student_array'];

//initialize array for feedback to frontend.
$response = array();

//query all the student that followed and update notification

foreach ($student_array as $student){
    $result_max_nid  = mysqli_query($conn,"select max(nid) as mnid from notification;");
    $nid = string(intval($result_max_nid->fetch_assoc()['mnid']) + 1);
    $sql_post_selected_student = "INSERT INTO notification(`nid`, `companysend`, `semailreceive`, `jid`, `pushtime`, `status`)
    VALUES ('$nid', '$cname', '$student', '$jid', CURDATE(), 'unviewed');";
    if (mysqli_query($conn, $sql_post_selected_student) == True){
        $response['$student'] = "Updated successfully.";
    }
    else{
        $response['$student'] = NULL;
    }
}

echo json_encode($response);
$conn->close();
?>