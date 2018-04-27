<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/17
 * Time: 20:37
 */
//initial classes for feedback to frontend.
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
//initialize return variable.
$response = array();
$temp_array = array();
//get parameters from frontend
$keyword = $_POST['keyword'];
$sgpalower = $_POST['sgpalower'];
$sgpahigh = $_POST['sgpahigh'];

//query from backend database to find the students that fit the keywords;
$sql_search_student = "select * from student where suniversity like '%$keyword%' or (sgpa between '$sgpalower' and '$sgpahigh')
or smajor like '%$keyword%';";
$result_search_student = mysqli_query($conn, $sql_search_student);
if ($result_search_student->num_rows > 0){
    while($row = $result_search_student->fetch_assoc()){
        $info = Build_personal_Info($row);
        array_push($temp_array, $info);
    }
    $response['student_info'] = $temp_array;
}
else{
    $response['student_info'] = []  ;
}

echo json_encode($response);

$conn->close();
?>