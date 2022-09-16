$(document).ready(function () {
    get_select_legajo();
    get_select_motivo();
    get_listado_ausencias();

    // new Tablesort($('#tabla_reporte')[0]);
    new Tablesort($('#tabla_productos')[0]);



    $('body').on('change', '#select_nuevo_motivo', function () {
        modifica_motivo();
    });

    $('body').on('click', '#btn-modifica-observacion', function () {
        modifica_observacion();
    });

    $('body').on('dblclick', '.modifica-motivo', function () {
        var id = $(this).data('id');
        var id_motivo = $(this).data('id_motivo');
        $('#select_nuevo_motivo').val(id_motivo);
        $('#id_nuevo_motivo').val(id);
        $('#modal-motivo').modal('show');
    });

    $('body').on('dblclick', '.modifica-observaciones', function () {
        var id = $(this).data('id');
        var observaciones = $(this).data('observaciones');
        $('#nuevo_observaciones').val(observaciones);
        $('#id_nuevo_observaciones').val(id);
        $('#modal-observaciones').modal('show');
    });


    $("body").on('submit', '#form-cargar-certificado', function (e) {
        e.preventDefault();

        var start = Date.parse($("#fecha_ausencia").val());
        var end = Date.parse($("#alta_ausencia").val());
        // console.log(start, end);
        var totalDays = Math.floor((end - start) / 1000 / 60 / 60 / 24);
        // console.log(totalDays);
        var $formulario = $(this);

        if (totalDays < 0){
            Notiflix.Report.failure(
                'Rango Negativo'
                ,'Fecha alta < Inicio de ausencia. No se puede cargar rangos negativos'
                ,'Ok',
                );
        }else{
            check_overlap($formulario);
        }

    });

    $("body").on('click', '#btn_excel', function () {
        $("#tabla_excel").table2excel({
            // exclude CSS class
            exclude: ".noExl",
            name: "HojaDespacho",
            filename: "Stock en Deposito - UOC " + $('#uoc').val(),
            fileext: ".xls", // file extension
            preserveColors: true
        });

    });

    $('body').on('contextmenu', '.click_derecho_custom', function (event) {
        // $('.click_derecho_custom').bind("contextmenu", function (event) {
        // Avoid the real one
        event.preventDefault();
        $("#id-seleccionado").val($(this).data('id'));

        $(".custom-menu").finish().toggle(100).

            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
    });
// If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {
        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {
            // Hide it
            $(".custom-menu").hide(100);
        }
    });
// If the menu element is clicked
    $(".custom-menu li").click(function () {
        // This is the triggered action name
        switch ($(this).attr("data-action")) {
            // A case for each action. Your actions here
            case "first":
                Notiflix.Confirm.show(
                    'Eliminar ausencia ' + $('#id-seleccionado').val()
                    , 'Seguro que quiere eliminar el ausencia?'
                    , 'Si', 'No',
                    function () {
                        borra_ausencia($('#id-seleccionado').val());
                    }
                    , function () {
                        // callbackalert('If you say so...');
                    });

                // alert("second");
                break;
        }
        // Hide it AFTER the action was triggered
        $(".custom-menu").hide(100);
    });

});


function check_overlap(formulario) {
    var parametros = $(formulario).serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'check_overlap',
        },
        {
            name: 'metodo',
            value: "select_sql",
        },
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
        },
        success: function (response) {
            console.log("check_overlap", response);

            if (response.cantidad_resultados){
                var conflicto = response.array_select[0].id;
                Notiflix.Report.failure(
                    'Rango Sobrepuesto'
                    ,'El rango que se quiere ingresar se superposiciona con uno cargado anteriormente <br>' +
                    'ID conflictivo: '+conflicto
                    ,'Ok',
                );
            }else{
                agrega_ausencia(formulario);
            }
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
        }
    })
}



function get_id_reporte() {
    var parametros = [];
    parametros.push(
        {
            name: 'query',
            value: 'get_id_reporte',
        },
        {
            name: 'metodo',
            value: "select_sql",
        },
    );
    var parametros = asociarSerialize(parametros);

    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            // Notiflix.Loading.circle('Cargando...');
        },
        success: function (response) {
            console.log("get_id_reporte", response);
            var id_reporte = response.array_select[0].ultimo_id;
            if (id_reporte < 1) {
                Notiflix.Report.failure(
                    'No hay acceso a la base de datos',
                    'No se puede obtener id unico para iniciar reporte',
                    'Ok',
                );
            }
            $('#id_reporte').val(id_reporte);

        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                // Notiflix.Loading.remove();
            }, 1000);
        }
    })
}


function get_select_productos() {
    var parametros = [];

    parametros.push(
        {
            name: 'query',
            value: 'get_select_productos',
        },
        {
            name: 'metodo',
            value: "select_sql",
        },
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#form-cargar-certificado');
        },
        success: function (response) {

            console.log("get_select_productos", response);

            var t_select_generico_ambos = $('#t_select_generico_ambos').html();
            var t_select_primero = $('#t_select_primero').html();

            $('#select_productos').empty();
            $('#select_productos').append(t_select_primero);

            $.each(response.array_select, function () {
                $('#select_productos').append(Mustache.render(t_select_generico_ambos, this));
            });

            $('#select_productos').select2();


        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#form-cargar-certificado');
            }, 1000);
        }
    })
}


function agrega_ausencia(formulario) {
    var parametros = $(formulario).serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'agrega_ausencia',
        },
        {
            name: 'metodo',
            value: "execute_sql",
        },
    );
    var parametros = asociarSerialize(parametros);
    // console.log('parametros que guarda', parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            // Notiflix.Loading.circle('Cargando...');
        },
        success: function (response) {
            console.log("agrega_ausencia", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Agregado con exito");
            } else {
                Notiflix.Notify.failure("ERROR DUPLICADO O QUERY");
            }
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            // Notiflix.Loading.remove();
            get_listado_ausencias();
        }
    })
}

function get_listado_ausencias() {
    var parametros = $(".filtros").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'get_listado_ausencias',
        },
        {
            name: 'metodo',
            value: "select_sql",
        }
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            Notiflix.Block.circle('#tabla_productos');
        },
        success: function (response) {
            console.log("get_listado_ausencias", response);

            var t_rows_listado = $('#t_rows_listado').html();
            $('#ppal_body').empty();
            $.each(response.array_select, function () {
                $('#ppal_body').append(Mustache.render(t_rows_listado, this));
            });
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#tabla_productos');
            }, 400);
        }
    })
}

function borra_ausencia(id) {
    var parametros = [];
    parametros.push(
        {
            name: 'query',
            value: 'borra_ausencia',
        },
        {
            name: 'metodo',
            value: "execute_sql",
        },
        {
            name: 'id',
            value: id,
        }
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            // Notiflix.Loading.circle('Cargando...');
        },
        success: function (response) {
            console.log("borra_ausencia", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Producto borrado con exito");
            } else {
                Notiflix.Notify.failure("Error borrando");
            }
            get_listado_ausencias();
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                // Notiflix.Loading.remove();
            }, 400);
        }
    })
}

function get_select_legajo() {
    var parametros = [];

    parametros.push(
        {
            name: 'query',
            value: 'get_select_legajo',
        },
        {
            name: 'metodo',
            value: "select_sql",
        },
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#form-cargar-certificado');
        },
        success: function (response) {

            console.log("get_select_legajo", response);

            var t_select_generico_ambos = $('#t_select_generico_ambos').html();
            var t_select_primero = $('#t_select_primero').html();

            $('#select_legajo').empty();
            $('#select_legajo').append(t_select_primero);

            $.each(response.array_select, function () {
                $('#select_legajo').append(Mustache.render(t_select_generico_ambos, this));
            });

            $('#select_legajo').select2();


        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#form-cargar-certificado');
            }, 1000);
        }
    })
}


function get_select_motivo() {
    var parametros = [];

    parametros.push(
        {
            name: 'query',
            value: 'get_select_motivo',
        },
        {
            name: 'metodo',
            value: "select_sql",
        },
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#form-cargar-certificado');
        },
        success: function (response) {

            console.log("get_select_motivo", response);

            var t_select_generico_ambos = $('#t_select_generico_ambos').html();
            var t_select_primero = $('#t_select_primero').html();

            $('#select_motivo').empty();
            $('#select_nuevo_motivo').empty();
            $('#select_motivo').append(t_select_primero);

            $.each(response.array_select, function () {
                $('#select_motivo').append(Mustache.render(t_select_generico_ambos, this));
                $('#select_nuevo_motivo').append(Mustache.render(t_select_generico_ambos, this));
            });

            $('#select_motivo').select2();


        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#form-cargar-certificado');
            }, 1000);
        }
    })
}


function finaliza_reporte() {
    // var parametros = [];
    var parametros = $(".adicionales").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'finaliza_reporte',
        },
        {
            name: 'metodo',
            value: "execute_sql",
        }
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_cargar.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            Notiflix.Loading.circle('Finalizando...');
        },
        success: function (response) {
            console.log("finaliza_reporte", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Reporte Finalizado con exito");
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            } else {
                Notiflix.Notify.failure("Error Finalizando");
            }
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            Notiflix.Loading.remove();
        }
    })
}