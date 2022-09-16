<?php

$pageTitle = "Reporte Listado - Ausentismo 📅";
$customCss = "css/style.css";
$customJs = "js/f_reporte_listado.js";

require_once('assets/header.php');
//$active_abm = 'active';
require_once('assets/navbar.php');
require_once('assets/templates.php');
require_once('assets/t_reporte_listado.php');
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
        <h1 class="p-lg-3">Reporte Listado</h1>
    </div>
    <div class="row">
        <div class="col">
            <label>Rango Desde</label>
            <input required value="<?php echo date('Y-m-d'); ?>" name="fecha_desde"
                   class="filtros form-group form-control"
                   type="date">
        </div>
        <div class="col">
            <label>Rango Hasta</label>
            <input required value="<?php echo date('Y-m-d'); ?>" name="fecha_hasta"
                   class="filtros form-group form-control"
                   type="date">
        </div>
    </div>
    <div class="row">
        <div class="col mt-2">
            <input type="text" placeholder="buscar" class="form-control filtros" name="buscar">
        </div>
        <div class="col">
            <div class="container mt-2 noprint">
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                                    aria-controls="panelsStayOpen-collapseThree">
                                Filtros
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                            <div class="accordion-body">
                                <div class="row fondo-blanco p-1">
                                    <div class="col">
                                        <label>Planta</label>
                                        <select id="select_planta" name="id_planta"
                                                class="form-select form-group filtros"
                                                required>
                                            <option value="T"  selected>Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row fondo-blanco p-1">
                                    <div class="col">
                                        <label>Motivo</label>
                                        <select id="select_motivo" name="id_motivo"
                                                class="form-select form-group filtros"
                                                required>
                                            <option value="T"  selected>Seleccione</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <hr>
    <table id="tabla_reporte" class="table table-hover content-table table-bordered table-sm">
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
            <th>Dias Total</th>
            <th>Dias Laborales</th>
            <th>Dias En Rango</th>
            <th>Observaciones</th>
        </tr>
        </thead>
        <tbody id="ppal_body">
        </tbody>
    </table>
</div>
