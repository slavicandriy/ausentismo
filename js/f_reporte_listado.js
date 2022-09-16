$(document).ready(function () {
    get_select_planta();
    get_select_motivo();
    get_listado_ausencias();

    $("body").on('change', '.filtros', function () {
        get_listado_ausencias();
    });

    new Tablesort($('#tabla_reporte')[0]);

    $('body').on('contextmenu', '.click_derecho_custom', function (event) {
        var usuario_actual = $('#usuario_intranet').val();

        if (!['usuario_generico_5', 'usuario_generico_9', 'usuario_generico_7'].includes(usuario_actual)) {
            event.preventDefault();
            $("#id-seleccionado").val($(this).data('id'));

            $(".custom-menu").finish().toggle(100).

                css({
                    top: event.pageY + "px",
                    left: event.pageX + "px"
                });
        }

    });

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


function get_listado_ausencias() {
    var usuario_actual = $('#usuario_intranet').val();
    var plantas_restrigindas =
        {
            usuario_generico_9:5,
            usuario_generico_7:5,
            usuario_generico_5:2
        };

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

    if (Object.keys(plantas_restrigindas).includes(usuario_actual)){
        var planta_a_mandar = plantas_restrigindas[usuario_actual];
        parametros.push(
            {
                name: 'id_planta',
                value: plantas_restrigindas[usuario_actual]
            }
        )
    }

    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_reporte_listado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            Notiflix.Block.circle('#tabla_reporte');
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
                Notiflix.Block.remove('#tabla_reporte');
            }, 400);
        }
    })
}

function get_select_planta() {
    var parametros = [];
    parametros.push(
        {
            name: 'query',
            value: 'get_select_planta',
        },
        {
            name: 'metodo',
            value: "select_sql",
        }
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_reporte_listado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            // Notiflix.Block.circle('#form-cargar-certificado');
        },
        success: function (response) {
            console.log("get_select_planta", response);

            var t_select_generico = $('#t_select_generico').html();
            var template_filtro_todos = $('#template_filtro_todos').html();

            $('#select_planta').empty();
            $('#select_planta').append(template_filtro_todos);

            $.each(response.array_select, function () {
                $('#select_planta').append(Mustache.render(t_select_generico, this));
            });

            $('#select_planta').select2();
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                // Notiflix.Block.remove('#form-cargar-certificado');
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
        url: 'ax/ax_reporte_listado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#panelsStayOpen-collapseThree');
        },
        success: function (response) {

            console.log("get_select_motivo", response);

            var t_select_generico_ambos = $('#t_select_generico_ambos').html();
            var template_filtro_todos = $('#template_filtro_todos').html();

            $('#select_motivo').empty();
            $('#select_nuevo_motivo').empty();
            $('#select_motivo').append(template_filtro_todos);

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
                Notiflix.Block.remove('#panelsStayOpen-collapseThree');
            }, 1000);
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
