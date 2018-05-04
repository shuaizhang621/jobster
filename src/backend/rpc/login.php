<?php
//import JWT for create a token for this user.
require("../../entity/JWT.php");
$object_JWT = new JWT();
//function used for create token.
function token_create($username){
    $key = "ZhangshuaiReallyhandsome";
    $object_JWT = new JWT();
    $token = array();
    $token['id'] == $username;
    $object_token = $object_JWT->encode($token, $key);
    return $object_token;
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

//initialize response to frontend.
$response = array();

//login page,check if the username and keywords are valid.
$username = $_POST['username'];
$keywords = $_POST['keywords'];
$user_type = $_POST['usertype'];

//prevent xss attack
$username = htmlspecialchars($username, ENT_QUOTES);
$keywords = htmlspecialchars($keywords, ENT_QUOTES);
$user_type = htmlspecialchars($user_type, ENT_QUOTES);

if ($user_type == 'student') {
    $sql_check_username_exist = "select semail from Student where semail = ?";
    $check_username_exist = $conn->prepare($sql_check_username_exist);
    $check_username_exist->bind_param('s',$username);
    $check_username_exist->execute();
    $result_check_user_name_exist = $check_username_exist->get_result();

    // $sql_keywords_match = "select semail, skey from Student where semail = '$username' and skey = '$keywords';";

    $sql_keywords_match = "select semail, skey from Student where (semail = ?) and (skey = ?);";
    $keywords_match = $conn->prepare($sql_keywords_match);
    $keywords_match->bind_param('ss',$username, $keywords);
    $keywords_match->execute();
    $result_keywords_match = $keywords_match->get_result();

    //create token.
    $response = token_create($username);
}
else if ($user_type == 'company') {
    $sql_check_username_exist = "select cname from Company where cname = ?";
    $check_username_exist = $conn->prepare($sql_check_username_exist);
    $check_username_exist->bind_param('s',$username);
    $check_username_exist->execute();
    $result_check_user_name_exist = $check_username_exist->get_result();

    $sql_keywords_match = "select cname, ckey from Company where cname = ? and ckey = ?;";
    $keywords_match = $conn->prepare($sql_keywords_match);
    $keywords_match->bind_param('ss',$username,$keywords);
    $keywords_match->execute();
    $result_keywords_match = $keywords_match->get_result();

    //create token.
    $response = token_create($username);
}

//$result_username_exist = mysqli_query($conn, $sql_check_username_exist);
if ($result_check_user_name_exist->num_rows > 0) {
//    $result_keywords_match = mysqli_query($conn, $sql_keywords_match);
    if ($result_keywords_match->num_rows > 0) {
//        $response['login status'] = "Login successfully!";
    } else {
        header('HTTP/1.0 403 Forbidden');
        die('The keyword is not correct!');
    }
} else {
    header('HTTP/1.0 403 Forbidden');
    die("The username has not been registered.");
}

echo json_encode($response);
?>