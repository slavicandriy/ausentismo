<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="icon" href="../favicon_logo_empresa.ico">
    <title><?php echo (is_null($pageTitle)) ? "Ausentismo 📅 " : "$pageTitle"; ?></title>

    <!--css-->
    <!--    <link rel="stylesheet" href="assets/css/bootstrap.css">-->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/fontawesome_all.css">
    <link rel="stylesheet" href="assets/css/notiflix-3.2.2.min.css">
    <!--    <link rel="stylesheet" href="assets/css/bootstrap-toggle.min.css">-->
    <link rel="stylesheet" href="assets/css/jquery-ui.css">
    <link rel="stylesheet" href="assets/css/select2.min.css">
    <link rel="stylesheet" href="css/click_derecho.css">

    <!--    custom-->
    <link rel="stylesheet" href="<?php echo (is_null($customCss)) ? "css/style.css" : "$customCss"; ?>">

    <!--js-->
    <script type="text/javascript" src="assets/js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="assets/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="assets/js/mustache.min.js"></script>
    <script type="text/javascript" src="assets/js/fontawesome_all.js"></script>
    <script type="text/javascript" src="assets/js/notiflix-3.2.2.min.js"></script>
    <!--    <script type="text/javascript" src="assets/js/bootstrap-toggle.min.js"></script>-->
    <script type="text/javascript" src="assets/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="assets/js/tablesort.min.js"></script>
    <script type="text/javascript" src="assets/js/tablesort.date.min.js"></script>
    <script type="text/javascript" src="assets/js/tablesort.number.min.js"></script>
<!--    <script type="text/javascript" src="assets/js/bootbox.min.js"></script>-->
    <script type="text/javascript" src="assets/js/select2.full.min.js"></script>
    <script type="text/javascript" src="assets/js/jquery.table2excel.js"></script>
    <!--    <script type="text/javascript" src="assets/js/qrcode.js"></script>-->


    <!--    custom-->
    <script type="text/javascript" src="js/def_functions.js"></script>
    <script type="text/javascript"
            src="<?php echo (is_null($customJs)) ? "js/f_index.js" : "$customJs"; ?>"></script>

</head>


<?php

//se usa el sistema de login externo (el de la intranet)
require_once("../Login/auth.php");

$admins = array(
             "usuario_admin_1"
            , "usuario_admin_2"
);
$usuario_reportes = array(
            "usuario_generico_5"
            , "usuario_generico_7"
            , "usuario_generico_9"
);

if (!in_array($User, $admins) and $Grupo != 'Sistemas') {
    $no_es_admin = 'hidden';
    $solo_reportes = 'hidden';
    if (in_array($User, $usuario_reportes)) {
        $solo_reportes = '';
    }
}


?>
<input id="usuario_intranet" type="text" hidden value="<?php echo $User ?>">
<input id="grupo_intranet" type="text" hidden value="<?php echo $Grupo ?>">
