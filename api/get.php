<?php
$method = 'GET';
require("header.php");
$id = $_GET["id"];
if ($id) {
    $sql = "SELECT * FROM contacts WHERE id='" . intval($id). "'";
    $result=mysqli_query($link,$sql);

    $row = mysqli_fetch_assoc($result);
    $obj = [];
    if ($row["id"] != null) { 
        http_response_code(200);
        $obj["id"] = $row["id"];
        $obj["name"] = $row["name"];
        $obj["surname"] = $row["surname"];
        $obj["id"] = $row["id"];
        $contacts = json_decode($row["contactItems"]);
        $obj["contacts"] = $contacts;
        echo json_encode($obj);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "ID does not exist."));
    }
} else {
    http_response_code(200);
    $sql= "SELECT * FROM contacts";
    $result=mysqli_query($link,$sql);

    $obj = [];
    while($row = mysqli_fetch_assoc($result)) {
        $innerObj = [];
        $innerObj["id"] = $row["id"];
        $innerObj["name"] = $row["name"];
        $innerObj["surname"] = $row["surname"];
        $innerObj["id"] = $row["id"];
        $contacts = json_decode($row["contactItems"]);
        $innerObj["contacts"] = $contacts;
        $obj[] = $innerObj;
    }
    echo json_encode($obj);
}
mysqli_close($link);