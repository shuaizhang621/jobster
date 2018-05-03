<?php
/**
 * Created by PhpStorm.
 * User: shuaizhang
 * Date: 5/1/18
 * Time: 7:59 PM
 */

function DBConnection(){
    $servername = "localhost";
    $dbusername = "root";
    $password = "root";
    $dbname = "jobster";

    // Create connection
    $conn = new mysqli($servername, $dbusername, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die(json_encode(array('message' => "Connection failed: " . $conn->connect_error)));
    }

    return $conn;
}

function DBClose($conn) {
    $conn->close();
}