<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/12
 * Time: 21:13
 */
//initialize the class and function of respose.
class job_info{
    public $jid;
    public $jtitle;
    public $jsalary;
    public $jreq_diploma;
    public $jreq_experience;
    public $jreq_skills;
    public $jlocation;
    public $jdescription;
}

function Build_Job_Info($row)
{
    $jobInfo = new job_info();
    $jobInfo->jid = $row['jid'];
    $jobInfo->jtitle = $row['jtitle'];
    $jobInfo->jsalary = $row['jsalary'];
    $jobInfo->jreq_diploma = $row['jreq_diploma'];
    $jobInfo->jreq_skills = $row['jreq_skills'];
    $jobInfo->jreq_experience = $row['jreq_experience'];
    $jobInfo->jdescription = $row['jdescription'];
    $jobInfo->jlocation = $row['jlocation'];
    return $jobInfo;
}

//get parameter from frontend.
$keyword = $_POST['keyword'];

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
//search companies that fit the keywords from backend database.
$sql_job_search = "select *  from  job where jid LIKE '%$keyword%' or jtitle like '%$keyword%' or 
jsalary like '%$keyword%' or jreq_diploma like '%$keyword%' or jreq_experience like '%$keyword%' or 
jreq_skills like '%$keyword%' or jlocation like '%$keyword%' or jdescription like '%$keyword%';";
$result_job_search = mysqli_query($conn, $sql_job_search);

if  ($result_job_search->num_rows > 0){
    while ($row = $result_job_search->fetch_assoc()){
        $info = Build_job_Info($row);
        array_push($response, $info);
    }
    echo json_encode($response_job_info);
}
else{
    header('HTTP/1.0 403 Forbidden');
    die('Cannot find job fits your keyword.');
}
$conn->close();
?>