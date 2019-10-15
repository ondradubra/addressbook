<?php
$method = 'PUT';
require("header.php");
$id = $_GET["id"];
$data = json_decode(file_get_contents("php://input"));
if ($id && $data && $id==$data->id) {
    $sql = "UPDATE contacts SET name='".$data->name."', surname='".$data->surname."', contactItems='".json_encode($data->contacts)."' WHERE id='" . intval($id). "'";
    if(mysqli_query($link,$sql)) {
        http_response_code(200);  
        echo json_encode(array("message" => "ok"));
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "Error in update contact. ".mysqli_error($conn)));
    }

} else {
    http_response_code(404);
    echo json_encode(array("message" => "ID or DATA not exist."));
}
mysqli_close($link);