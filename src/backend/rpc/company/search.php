<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/17
 * Time: 20:37
 */
// import the classes used in this file
require("../../entity/classes.php");
$objectStudentInfo = new personal_info();

require ("../../entity/class.pdf2text.php.php");
$PDF_reader = new PDF2Text();

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
//initialize return variable.
$response = array();
$temp_array = array();
//get parameters from frontend
$keyword = $_POST['keyword'];
$sgpalower = $_POST['sgpalower'];
$sgpahigh = $_POST['sgpahigh'];

$response = array();
//query from backend database to find the students that fit the keywords;
$sql_search_student = "select * from student where suniversity like '%$keyword%' or (sgpa between '$sgpalower' and '$sgpahigh')
or smajor like '%$keyword%';";
$result_search_student = mysqli_query($conn, $sql_search_student);
if ($result_search_student->num_rows > 0){
    while($row = $result_search_student->fetch_assoc()){
        $info = $objectStudentInfo->Build_personal_Info($row);
        $response[$row['semail']] = $info;
    }
}
//query resume that fit the keyword

$sql_resume_path = "select * from Student;";
$result_resume_path = mysqli_query($conn, $sql_resume_path);
if ($result_resume_path->num_rows > 0) {
    // echo "!!!"."<br>";
    while ($row = $result_resume_path->fetch_assoc()) {
        $PDF_reader->setFilename($row['sresume']);
        $PDF_reader->decodePDF();
        if (strpos($PDF_reader->output(), $keyword) or (strstr($row['suniversity'],$keyword)) or (strstr($row['smajor'], $keyword)))
        {
            $info = $objectStudentInfo->Build_personal_Info($row);
            $response[$row['semail']] = $info;
        }
    }
}
else {
    // header('HTTP/1.0 403 Forbidden');
    $response['error'] = "No result fits your keyword.";
}


echo json_encode($response);

$conn->close();
?>