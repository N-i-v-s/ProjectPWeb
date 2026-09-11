<?php

include 'conexao.php';

header('Content-type: application/json');

$sql = "UPDATE categoria SET descricao = '".$_POST['descricao']."', tempo = ".
        $_POST['tempo'].", valMulta = ". $_POST['valMulta']
        ." WHERE codcategoria = ".$_POST['codcategoria'];

if ($conn->query($sql) === TRUE) {
    $msg = "Categoria atualizada com sucesso!";
} else {
    $msg = "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

echo json_encode(['msg' => $msg]);

?>