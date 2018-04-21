<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/13
 * Time: 13:21
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

//get parameter from frontend
$keyword = $_POST['keyword'];

//query from backend database which fit the keywords.
$sql_search_student = "select * from Student where semail like '%$keyword%' or  sphone like '%$keyword%' or  
sfirstname like '%$keyword%' or  slastname like '%$keyword%' or suniversity like '%$keyword%' or 
smajor  like '%$keyword%' or  sgpa  like '%$keyword%' or sresume like  like '%$keyword%';";

$result_search_student = mysqli_query($conn, $sql_search_student);
    if  ($result_search_student->num_rows > 0){
        while ($row = $result_search_student->fetch_assoc()){
            $info = Build_personal_Info($row);
            array_push($response, $info);
        }
        echo json_encode($response_personal_info);
    }
    else {
        header('HTTP/1.0 403 Forbidden');
        die('Cannot find student that fit your keyword.');
    }
$conn->close();
?>
