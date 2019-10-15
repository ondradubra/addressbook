<?php
$method = 'POST';
require("header.php");
$data = json_decode(file_get_contents("php://input"));
if ($data) {
    $sql = "INSERT INTO contacts (`name`, `surname`, `contactItems`) VALUES ('".$data->name."','".$data->surname."', '".json_encode($data->contacts)."')";
    if(mysqli_query($link,$sql)) {
        http_response_code(200);  
        echo json_encode(array("id" => mysqli_insert_id($link)));
    } else {
        echo json_encode(array("message" => "Error in update contact. ".mysqli_error($conn)));
    }

} else {
    echo json_encode(array("message" => "DATA does not exist."));
}
mysqli_close($link);