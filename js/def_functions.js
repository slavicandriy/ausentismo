
// funciones generales
function numberWithPuntos(x) {
    // editado para que sean puntos
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// function int2month(x) {
//     // editado para que sean puntos
//     var meses = ["Enero"
//         , "Febrero"
//         , "Marzo"
//         , "Abril"
//         , "Mayo"
//         , "Junio"
//         , "Julio"
//         , "Agosto"
//         , "Septiembre"
//         , "Octubre"
//         , "Noviembre"
//         , "Diciembre"];
//     return meses[x - 1];
// }

function asociarSerialize(arraySerialized) {
    var arrAsociado = {};

    $.each(arraySerialized, function () {
        arrAsociado[this['name']] = this['value'];
    });

    return arrAsociado;
}

// function getBusinessDatesCount(startDate, endDate) {
//     var count = 0;
//     var curDate = startDate;
//     while (curDate <= endDate) {
//         var dayOfWeek = curDate.getDay();
//         if(!((dayOfWeek == 6) || (dayOfWeek == 5)))
//             count++;
//         curDate.setDate(curDate.getDate() + 1);
//     }
//     console.log('dias', count);
//     return count;
// }


// ARCHIVOS

function deleteArchivo(archivo_id) {

    $.ajax({
        type: 'POST',
        url: '../archivos_gral/upload_7.php',
        dataType: 'JSON',
        data: {
            metodo: 'deleteArchivo',
            archivo_id: archivo_id,
        },

        success: function (response) {

            getArchivos();
            console.log("deleteArchivo", response);

        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        }
    })
}

function subirArchivoAjax() {

    var formData = new FormData(document.getElementById("formuploadajax"));
    formData.append("metodo", "subirArchivo");

    $.ajax({
        type: "POST",
        url: '../archivos_gral/upload_7.php',
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            console.log("subirArchivo JSON response:", JSON.parse(response));
            $('#file').val(null);
            getArchivos();
            $("#modal_archivos").modal('hide');

        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log("subirArchivo No se obtuvo respuesta esperada  ", xhr);
        }
    })

}

function getArchivos() {

    var idAsoc = $('#idAsoc').val();
    var userCrea = $('#userCrea').val();
    var sistemaUsado = $('#sistemaUsado').val();

    $.ajax({
        type: 'GET',
        url: '../archivos_gral/upload_7.php',
        dataType: 'JSON',
        data: {
            metodo: 'getArchivos',
            idAsoc: idAsoc,
            userCrea: userCrea,
            sistemaUsado: sistemaUsado
        },
        success: function (response) {
            console.log("getArchivos", response);

            var template_archivo_list = $('#template_archivo_list').html();

            $('.todos-archivos').empty();

            var realURL = "http://192.168.3.141/archivos_gral/";
            var ultimo_comentario = "";


            $.each(response.array_file, function () {

                console.log(ultimo_comentario)

                if (ultimo_comentario == this.comentario){
                    this.comentario = "";
                }else{
                    ultimo_comentario = this.comentario;
                }
                this['archivo_path_short'] = this['archivo_path'].substring(14);
                this['archivo_path'] = realURL + this['archivo_path'];
                $('.todos-archivos').append(Mustache.render(template_archivo_list, this));
                // console.log(this['archivo_path_short'] = this['archivo_path'].substring(6));
            })
        },
        error: function (xhr) {
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        }
    })
}

function modifica_motivo() {
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
            value: $('#id_nuevo_motivo').val(),
        },
        {
            name: 'id_motivo',
            value: $('#select_nuevo_motivo').val(),
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
            console.log("modifica_motivo", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Modificado con exito");
            } else {
                Notiflix.Notify.failure("Error modificando");
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
function modifica_observacion() {
    var parametros = [];
    parametros.push(
        {
            name: 'query',
            value: 'modifica_observacion',
        },
        {
            name: 'metodo',
            value: "execute_sql",
        },
        {
            name: 'id',
            value: $('#id_nuevo_observaciones').val(),
        },
        {
            name: 'observaciones',
            value: $('#nuevo_observaciones').val(),
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
            console.log("modifica_observacion", response);
            if (response.affected_rows) {
                Notiflix.Notify.success("Modificado con exito");
            } else {
                Notiflix.Notify.failure("Error modificando");
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
