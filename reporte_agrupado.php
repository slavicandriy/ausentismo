<script type="text/javascript" src="assets/js/highcharts.js"></script>
<link rel="stylesheet" href="assets/css/highcharts.css">

<?php

$pageTitle = "Reporte Agrupado - Ausentismo 📅";
$customCss = "css/style.css";
$customJs = "js/f_reporte_agrupado.js";

require_once('assets/header.php');
//$active_abm = 'active';
require_once('assets/navbar.php');
require_once('assets/templates.php');
require_once('assets/t_reporte_agrupado.php');

?>

<div class="container-fluid mt-4 border border-secondary">
    <div class="m-0 text-center">
        <h1 class="p-lg-3">Reporte Agrupado</h1>
    </div>
    <div class="row">
        <div class="col">
            <label>Fecha Desde</label>
            <input required value="<?php echo date('Y-m-d'); ?>" name="fecha_desde"
                   class="filtros form-group form-control"
                   type="date">
        </div>
        <div class="col">
            <label>Fecha Hasta</label>
            <input required value="<?php echo date('Y-m-d'); ?>" name="fecha_hasta"
                   class="filtros form-group form-control"
                   type="date">
        </div>
    </div>
    <hr>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
    <hr>
    <table id="tabla_planta" class="table table-hover content-table table-bordered table-sm">
        <thead>
        <tr>
            <th>Planta</th>
            <th>Cant Ausentes</th>
        </tr>
        </thead>
        <tbody id="planta_body">
        </tbody>
    </table>
    <hr>
    <table id="tabla_motivo" class="table table-hover content-table table-bordered table-sm">
        <thead>
        <tr>
            <th>Motivo</th>
            <th>Cant Ausentes</th>
        </tr>
        </thead>
        <tbody id="motivo_body">
        </tbody>
    </table>
    <hr>
    <table id="tabla_planta_motivo" class="table table-hover content-table table-bordered table-sm">
        <thead>
        <tr>
            <th>Planta</th>
            <th>Motivo</th>
            <th>Cant Ausentes</th>
        </tr>
        </thead>
        <tbody id="planta_motivo_body">
        </tbody>
    </table>
</div>
