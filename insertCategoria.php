<?php

include 'conexao.php';

header('Content-type: application/json');

$sql = "INSERT INTO categoria(descricao, tempo, valMulta) VALUES ('"
        .$_POST['descricao']."' ,". $_POST['tempo'].",". $_POST['valMulta'].")";

if ($conn->query($sql) === TRUE) {
    $msg = "Categoria criada com sucesso!";
} else {
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg'=>$msg]);

?>