<?php
/**
 * Created by PhpStorm.
 * User: hp
 * Date: 2018/4/26
 * Time: 13:29
 */
//import classes needed in this script
require ("../../entity/class.pdf2text.php.php");
$PDF_reader = new PDF2Text();

//get parameter from frontend and initialize response to frontend
$keyword = $_POST['keyword'];
$keyword = htmlspecialchars($keyword, ENT_QUOTES);
$response = array();
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

$sql_resume_path = "select semail,sresume from Student;";
$result_resume_path = mysqli_query($conn, $sql_resume_path);
if ($result_resume_path->num_rows > 0){
    while($row = $result_resume_path->fetch_assoc()){
        $PDF_reader->setFilename($row['sresume']);
        $PDF_reader->decodePDF();
        if (strpos($PDF_reader->output(), '$keyword')){
            $response[$row['semail']] = $row['sresume'];
        }
    }
}
else{
//    echo 'error!';
}
echo json_encode($response);
/*
$a = new PDF2Text();
$a->setFilename('Yancheng_Chen_Resume.pdf');
$a->decodePDF();
echo $a->output();
*/
$conn->close();
?>