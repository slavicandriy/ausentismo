<?php
require_once("../../coneccionbasedatos.php");

$parametros = array_map("ms_escape_string",$_REQUEST['parametros']);

$response['parametros'] = $parametros;

$method = $parametros['metodo'];

$response = array();
$response['metodo'] = $method;

$debug_export = var_export($_REQUEST, true);
$response['debug'] = $debug_export;
$response['debug2'] = $parametros;

if (function_exists($method)) {
    $response['existencia'] = 'si';
    $method();
} else {
    $response['existencia'] = 'no';
//    die();
}


//echo json_encode($response);
sqlsrv_close($conectID);
echo json_encode($response);


function execute_sql()
{
    global $conectID;
    global $response;
    global $parametros;

    $query = genera_query($parametros);


    $response['query_usado'] = $query;
//    $resultado = sqlsrv_query($conectID, $query);
    $stmt = sqlsrv_query($conectID, $query);
    $response['affected_rows'] = sqlsrv_rows_affected($stmt);
    $response['num_rows'] = sqlsrv_num_rows($conectID);

}

function select_sql()
{
    global $conectID;
    global $response;
    global $parametros;

    $query = genera_query($parametros);

    $response['query_usado'] = $query;


    $resultado = sqlsrv_query($conectID, $query);

    $array = array();

    $i = 0;
    while ($row = sqlsrv_fetch_array($resultado, SQLSRV_FETCH_ASSOC)) {
        $i++;
        array_push($array, $row);
    }


    if ($i > 0) {
        $response['query_exitoso'] = "Se obtuvieron $i resultados";
        $response['cantidad_resultados'] = "$i";
    } else {
        $response['query_exitoso'] = print_r(sqlsrv_errors(), true);
//        $response['query_exitoso'] = "Error de sql";
    }
    $response['array_select'] = $array;


}


function ms_escape_string($data)
{
//    if (!isset($data) or empty($data)) return '';
    if (is_numeric($data)) return $data;

    $non_displayables = array(
        '/%0[0-8bcef]/',            // url encoded 00-08, 11, 12, 14, 15
        '/%1[0-9a-f]/',             // url encoded 16-31
        '/[\x00-\x08]/',            // 00-08
        '/\x0b/',                   // 11
        '/\x0c/',                   // 12
        '/[\x0e-\x1f]/'             // 14-31
    );
    foreach ($non_displayables as $regex)
        $data = preg_replace($regex, '', $data);
    $data = str_replace("'", "''", $data);
    return $data;
}

