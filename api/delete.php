<?php
$method = 'DELETE';
require("header.php");
$id = $_GET["id"];
if ($id) {
    $sql = "DELETE FROM contacts WHERE id='".intval($id)."'";
    if(mysqli_query($link,$sql)) {
        http_response_code(200);  
        echo json_encode(array("message" => "ok"));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Error - deleting contact. ".mysqli_error($conn)));
    }

} else {
    http_response_code(404);
    echo json_encode(array("message" => "ID does exist."));
}
mysqli_close($link);