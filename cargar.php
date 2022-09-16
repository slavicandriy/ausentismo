<?php
$pageTitle = "Cargar - Ausentismo 📅";
$customCss = "css/style.css";
$customJs = "js/f_cargar.js";

//$User = "testUser1";
//$id_archivo = date("Y") . date("m") . date("d") . "_" . rand(1000, 9999);

require_once('assets/header.php');
$active_cargar = 'active';
require_once('assets/navbar.php');
require_once('assets/templates.php');
require_once('assets/t_cargar.php');
require_once('assets/m_reporte_listado.php');

?>

<ul class='custom-menu'>
    <input id="id-seleccionado" readonly class="form-control form-control-sm " type="text" value="no">
    <!--    <li data-action="first"> 📝 Modificar Certificado</li>-->
    <li data-action="first"> ❌ Borrar Ausencia</li>
    <!--    <li data-action="second">❌ Borrar Certificado</li>-->
</ul>

<div class="container-fluid mt-4 border border-secondary">
    <div class="m-0 text-center">
        <h1 class="p-lg-3">Cargar Ausencias</h1>
    </div>
    <form id="form-cargar-certificado" method='post' class="m-3">
        <div class="row">
            <div class="col">
                <label>Legajo</label>
                <select id="select_legajo" name="legajo" class="form-select form-group" required>
                    <option value="" disabled selected>Seleccione</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Motivo</label>
                <select id="select_motivo" name="id_motivo" class="form-select form-group" required>
                    <option value="" disabled selected>Seleccione</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Fecha Ausencia</label>
                <input required value="<?php echo date('Y-m-d'); ?>" name="fecha_ausencia" id="fecha_ausencia"
                       class="form-group form-control" type="date">
            </div>
            <div class="col">
                <label>Alta Ausencia</label>
                <input required value="<?php echo date('Y-m-d'); ?>" name="alta_ausencia" id="alta_ausencia"
                       class="form-group form-control" type="date">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label>Observaciones</label>
                <textarea class="form-control" name="observaciones" rows="3"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-outline-primary mt-3" type="submit">Agregar</button>
            </div>
        </div>
    </form>
    <table id="tabla_productos" class="table table-hover content-table table-bordered table-sm">
        <thead>
        <tr>
            <th>ID</th>
            <th>Legajo</th>
            <th>Apellido y Nombre</th>
            <th>Planta</th>
            <th>Sector</th>
            <th>Motivo</th>
            <th>Fecha Ausencia</th>
            <th>Alta Ausencia</th>
            <th>Observaciones</th>
        </tr>
        </thead>
        <tbody id="ppal_body">
        </tbody>
    </table>
</div>
