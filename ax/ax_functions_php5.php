<?php
require_once("../../coneccionbasedatos.php");
$response = array();

$parametros = $_REQUEST['parametros'];
$response['parametros2'] = $parametros;

//$parametros = array_map("utf8_detect_decode", $parametros);
$parametros = array_map("utf8_decode", $parametros);
$parametros = array_map("ms_escape_string", $parametros);


$method = $parametros['metodo'];
$response['metodo'] = $method;

$debug_export = var_export($_REQUEST, true);
$response['debug'] = $debug_export;

if (function_exists($method)) {
    $response['existencia'] = 'si';
    $method();
} else {
    $response['existencia'] = 'no';
}

echo json_encode($response);
mssql_close($conectID);

function execute_sql()
{
    global $conectID;
    global $response;
    global $parametros;

    $query = genera_query($parametros);

    $response['query_usado'] = $query;
    $response['resultado'] = mssql_query($query, $conectID);
    $response['affected_rows'] = mssql_rows_affected($conectID);
    $response['last_msg'] = mssql_get_last_message();


    $array = array();

    $response['array_select'] = $array;
}

function select_sql()
{
    global $response;
    global $parametros;


    $query = genera_query($parametros);

    $response['query_usado'] = $query;
    $resultado = mssql_query($query);

    $array = array();

    while ($row = mssql_fetch_assoc($resultado)) {
//        $row = array_map("strtoupper", $row);
        $row = array_map("utf8_encode", $row);
        array_push($array, $row);
    }

    $cant_resultados = sizeof($array);
    $response['last_msg'] = mssql_get_last_message();

    if ($cant_resultados > 0) {
        $response['query_resultados'] = "Se obtuvieron $cant_resultados resultados";
        $response['cantidad_num'] = $cant_resultados;
    } else {
        $response['query_resultados'] = "Error de sql";
    }

    $response['array_select'] = $array;

}

function ms_escape_string($data)
{
//    if (!isset($data) or empty($data)) return ''; //ESTO ROMPE SI ENTRA 0 COMO PARAMETRO
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

function utf8_detect_decode($str)
{
    $decoded = utf8_decode($str);
    if (mb_detect_encoding($decoded, 'UTF-8', true) === false)
        return $str;
    return $decoded;
}
