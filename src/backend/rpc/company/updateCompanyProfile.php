<?php
/**
 * Created by PhpStorm.
 * User: Stand Alone Complex
 * Date: 2018/4/20
 * Time: 14:13
 */
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

//get parameters from frontend.
$cname = $_POST['cname'];
$clocation = $_POST['clocation'];
$cemail = $_POST['cemail'];
$cindustry = $_POST['cindustry'];
$cdescription = $_POST['cdescription'];

//prevent xss attack
$cname = htmlspecialchars($cname, ENT_QUOTES);
$clocation = htmlspecialchars($clocation, ENT_QUOTES);
$cemail = htmlspecialchars($cemail, ENT_QUOTES);
$cindustry = htmlspecialchars($cindustry, ENT_QUOTES);
$cdescription = htmlspecialchars($cdescription, ENT_QUOTES);


//get token
$token = $_POST["token"];
//verify the token
require("../../entity/JWT.php");
$object_JWT = new JWT();
if (!$object_JWT->token_verify($token, $cname)){
    header('HTTP/1.0 401 Unauthorized');
    die ("Your token is not matched with your username");
}


//initialize response to frontend.
$response = array();

//update company information to backend database.
$sql_update_company_info = "update Company set clocation = ?, cemail = ?, cindustry = ?, cdescription = ? 
                              where cname = ?;";
$update_company_info = $conn->prepare($sql_update_company_info);
$update_company_info->bind_param('sssss',$clocation, $cemail, $cindustry, $cdescription,$cname);
if ($update_company_info->execute()){
    $response['update_company_info'] = "Company user ".$cname.": Profile updated successfully!";
}
else{
    $response = "ERROR: ".$sql_update_company_info."<br>".$conn->error;
}
echo json_encode($response);
$conn->close();
?>