<?php

$pageTitle = "ABM - Ausentismo 📅";
$customCss = "css/style.css";
$customJs = "js/f_abm.js";

//$User = "testUser1";
//$id_archivo = date("Y") . date("m") . date("d") . "_" . rand(1000, 9999);


require_once('assets/header.php');
$active_abm = 'active';
require_once('assets/navbar.php');
require_once('assets/templates.php');
require_once('assets/t_listado_abm.php');


?>

<ul class='custom-menu'>
    <input id="id-seleccionado" readonly class="form-control form-control-sm " type="text" value="no">
<!--    <li data-action="first"> 📝 Modificar Certificado</li>-->
    <input id="descripcion-seleccionado" class="form-control form-group-sm" type="text">
    <li data-action="first"> ❌ Borrar Motivo</li>
    <li data-action="second"> 📝 Modificar Descripcion</li>
    <!--    <li data-action="second">❌ Borrar Certificado</li>-->
</ul>

<div class="container-fluid mt-4 border border-secondary">
    <div class="m-0 text-center">
        <h1 class="p-lg-3">ABM Motivo</h1>
    </div>
    <form id="form-cargar-certificado" method='post' class="m-3">
        <input hidden name="usuario_carga" type="text" value="<?php echo $User ?>">
        <div class="row">
            <div class="col">
                <label>ID</label>
                <input type="number" id="id" name="id" class="form-control form-group" required>
            </div>
            <div class="col">
                <label>Descripcion</label>
                <input type="text" id="descripcion" name="descripcion" class="form-control form-group" required>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button class="btn btn-outline-primary mt-3" type="submit">Agregar</button>
            </div>
        </div>
    </form>
    <hr>
    <table id="tabla_productos" class="table table-hover content-table table-bordered table-sm">
        <thead>
        <tr>
            <th>ID</th>
            <th>Descripcion</th>
        </tr>
        </thead>
        <tbody id="ppal_body">
        </tbody>
    </table>

</div>
