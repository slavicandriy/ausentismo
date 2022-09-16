$(document).ready(function () {
    get_listado_motivos();
    new Tablesort($('#tabla_productos')[0]);

    $("body").on('submit', '#form-cargar-certificado', function (e) {
        e.preventDefault();
        var $formulario = $(this);
        agrega_motivo($formulario);
    });

    $("body").on('change', '.cambia', function () {
        var codigo = $(this).parent().parent().data('id');
        var valor = $(this).val();
        var tipo = $(this).data('tipo');
        cambia_valor(codigo, valor, tipo);
    });

    $('body').on('contextmenu', '.click_derecho_custom', function (event) {
        // $('.click_derecho_custom').bind("contextmenu", function (event) {
        // Avoid the real one
        event.preventDefault();
        $("#id-seleccionado").val($(this).data('id'));
        $("#descripcion-seleccionado").val($(this).data('descripcion'));

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
                    'Eliminar motivo ' + $('#id-seleccionado').val()
                    , 'Seguro que quiere eliminar el motivo?'
                    , 'Si', 'No',
                    function () {
                        borra_motivo($('#id-seleccionado').val());
                    }
                    , function () {
                        // callbackalert('If you say so...');
                    });

                // alert("second");
                break;
                case "second":
                Notiflix.Confirm.show(
                    'Modificar descripcion ' + $('#id-seleccionado').val()
                    , 'Seguro que quiere modificar la descripcion?'
                    , 'Si', 'No',
                    function () {
                        modifica_motivo($('#id-seleccionado').val(),  $('#descripcion-seleccionado').val());
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

function agrega_motivo(formulario) {
    var parametros = $(formulario).serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'agrega_motivo',
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
        url: 'ax/ax_abm.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            Notiflix.Loading.circle('Cargando...');
        },
        success: function (response) {
            console.log("agrega_motivo", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Agregado con exito");
                get_listado_motivos();
            } else {
                Notiflix.Notify.failure("ERROR EN EL QUERY");
            }
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            $('#descripcion').val("");
            Notiflix.Loading.remove();
        }
    })
}

function borra_motivo(id) {
    var parametros = [];
    parametros.push(
        {
            name: 'query',
            value: 'borra_motivo',
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
        url: 'ax/ax_abm.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            // Notiflix.Loading.circle('Cargando...');
        },
        success: function (response) {

            console.log("borra_motivo", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Motivo borrado con exito");
            } else {
                Notiflix.Notify.failure("No se pudo Borrar");
            }
            get_listado_motivos();

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

function get_listado_motivos() {
    var parametros = $(".filtros").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'get_listado_motivos',
        },
        {
            name: 'metodo',
            value: "select_sql",
        },
    );
    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_abm.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            Notiflix.Block.circle('#tabla_productos');
        },
        success: function (response) {

            console.log("get_listado_motivos", response);

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

function modifica_motivo(id, descripcion) {
    var parametros = [];
    parametros.push(
        {
            name: 'query',
            value: 'modifica_motivo',
        },
        {
            name: 'metodo',
            value: "execute_sql",
        },
        {
            name: 'id',
            value: id,
        },
        {
            name: 'descripcion',
            value: descripcion,
        }
    );
    var parametros = asociarSerialize(parametros);

    $.ajax({
        type: 'POST',
        url: 'ax/ax_abm.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },

        beforeSend: function () {
            // Notiflix.Loading.circle('Cargando...');
        },
        success: function (response) {

            console.log("modifica_motivo", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Motivo Modificado con exito");
            } else {
                Notiflix.Notify.failure("No se pudo Borrar");
            }
            get_listado_motivos();

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