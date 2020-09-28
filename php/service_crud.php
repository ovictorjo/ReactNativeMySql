<?php
$result = null;
$obj = file_get_contents('php://input');
$obj = json_decode($obj,true);

$dt_nascimento = date('Y-m-d',strtotime($obj['dt_nascimento']));
$obj['dt_nascimento'] = $dt_nascimento;

$db = @mysqli_connect("localhost","root","","android");

if(mysqli_connect_errno()){
    $result['message'] = "Banco de Dados não conectado: ".mysqli_connect_error();
    die(json_encode($result));
}


$queryStr = array();

foreach($obj as $key => $value){
    $queryStr[] = "$key='$value'";
}

$queryStr = "INSERT INTO clientes SET ".join(",",$queryStr);

$execQuery = mysqli_query($db, $queryStr);
$result = array("message" => $execQuery);
if($execQuery){
    $result = array("message" => "Dados salvo com sucesso");
}else{
    $result = array("message" => "Mysqli Error: ".mysqli_error($db));
}

echo json_encode($result);