$(document).ready(function () {
    get_agrupado_ausencias_planta();
    get_agrupado_ausencias_motivo();
    get_agrupado_ausencias_planta_motivo();
    get_datos_grafico_agrupado();

    $("body").on('change', '.filtros', function () {
        get_agrupado_ausencias_planta();
        get_agrupado_ausencias_motivo();
        get_agrupado_ausencias_planta_motivo();
        get_datos_grafico_agrupado();
    });

    new Tablesort($('#tabla_planta')[0]);
    new Tablesort($('#tabla_motivo')[0]);
    new Tablesort($('#tabla_planta_motivo')[0]);


});

function get_agrupado_ausencias_planta() {
    var usuario_actual = $('#usuario_intranet').val();
    var plantas_restrigindas =
        {
            usuario_generico_9: 5,
            usuario_generico_7: 5,
            usuario_generico_5: 6,
        };

    var parametros = $(".filtros").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'get_agrupado_ausencias_planta',
        },
        {
            name: 'metodo',
            value: "select_sql",
        }
    );

    if (Object.keys(plantas_restrigindas).includes(usuario_actual)) {
        var planta_a_mandar = plantas_restrigindas[usuario_actual];
        parametros.push(
            {
                name: 'restriccion_planta',
                value: 'AND planta = ' + plantas_restrigindas[usuario_actual]
            }
        )
    }

    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_reporte_agrupado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#tabla_planta');
        },
        success: function (response) {
            console.log("get_agrupado_ausencias_planta", response);

            var t_row_planta = $('#t_row_planta').html();
            $('#planta_body').empty();
            $.each(response.array_select, function () {
                $('#planta_body').append(Mustache.render(t_row_planta, this));
            });
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#tabla_planta');
            }, 400);
        }
    })
}

function get_agrupado_ausencias_motivo() {
    var usuario_actual = $('#usuario_intranet').val();
    var plantas_restrigindas =
        {
            usuario_generico_9: 5,
            usuario_generico_7: 5,
            usuario_generico_5: 6,

        };

    var parametros = $(".filtros").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'get_agrupado_ausencias_motivo',
        },
        {
            name: 'metodo',
            value: "select_sql",
        }
    );

    if (Object.keys(plantas_restrigindas).includes(usuario_actual)) {
        var planta_a_mandar = plantas_restrigindas[usuario_actual];
        parametros.push(
            {
                name: 'restriccion_planta',
                value: 'AND planta = ' + plantas_restrigindas[usuario_actual]
            }
        )
    }


    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_reporte_agrupado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#tabla_motivo');
        },
        success: function (response) {
            console.log("get_agrupado_ausencias_motivo", response);

            var t_row_motivo = $('#t_row_motivo').html();
            $('#motivo_body').empty();
            $.each(response.array_select, function () {
                $('#motivo_body').append(Mustache.render(t_row_motivo, this));
            });
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#tabla_motivo');
            }, 400);
        }
    })
}

function get_agrupado_ausencias_planta_motivo() {
    var usuario_actual = $('#usuario_intranet').val();
    var plantas_restrigindas =
        {
            usuario_generico_9: 5,
            usuario_generico_7: 5,
            usuario_generico_5: 6,

        };

    var parametros = $(".filtros").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'get_agrupado_ausencias_planta_motivo',
        },
        {
            name: 'metodo',
            value: "select_sql",
        }
    );

    if (Object.keys(plantas_restrigindas).includes(usuario_actual)) {
        var planta_a_mandar = plantas_restrigindas[usuario_actual];
        parametros.push(
            {
                name: 'restriccion_planta',
                value: 'AND planta = ' + plantas_restrigindas[usuario_actual]
            }
        )
    }


    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_reporte_agrupado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            Notiflix.Block.circle('#tabla_planta_motivo');
        },
        success: function (response) {
            console.log("get_agrupado_ausencias_planta_motivo", response);

            var t_row_planta_motivo = $('#t_row_planta_motivo').html();
            $('#planta_motivo_body').empty();
            $.each(response.array_select, function () {
                $('#planta_motivo_body').append(Mustache.render(t_row_planta_motivo, this));
            });
        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                Notiflix.Block.remove('#tabla_planta_motivo');
            }, 400);
        }
    })
}

function get_datos_grafico_agrupado() {
    var usuario_actual = $('#usuario_intranet').val();
    var plantas_restrigindas =
        {
            usuario_generico_9: 5,
            usuario_generico_7: 5,
            usuario_generico_5: 6,

        };

    var parametros = $(".filtros").serializeArray();
    parametros.push(
        {
            name: 'query',
            value: 'get_datos_grafico_agrupado',
        },
        {
            name: 'metodo',
            value: "select_sql",
        }
    );

    if (Object.keys(plantas_restrigindas).includes(usuario_actual)) {
        var planta_a_mandar = plantas_restrigindas[usuario_actual];
        parametros.push(
            {
                name: 'restriccion_planta',
                value: 'AND planta = ' + plantas_restrigindas[usuario_actual]
            }
        )
    }


    var parametros = asociarSerialize(parametros);
    $.ajax({
        type: 'POST',
        url: 'ax/ax_reporte_agrupado.php',
        dataType: 'JSON',
        data: {
            parametros: parametros
        },
        beforeSend: function () {
            // Notiflix.Block.circle('#tabla_planta_motivo');
        },
        success: function (response) {
            console.log("get_datos_grafico_agrupado", response);
            var resultados = response.array_select;
            var plantas = [];
            var motivos = [];

            $.each(resultados, function () {
                if (!plantas.includes(this.planta)) {
                    plantas.push(this.planta);
                }
                if (!motivos.includes(this.motivo)) {
                    motivos.push(this.motivo);
                }
            });

            var cantidad_plantas = plantas.length;

            console.log('plantas', plantas);
            console.log('motivos', motivos);

            var series = [];

            $.each(motivos, function () {
                series.push(
                    {
                        name: this,
                        data: Array(cantidad_plantas).fill('')
                    }
                )
            });

            $.each(resultados, function () {
                planta = plantas.indexOf(this.planta);
                motivo = motivos.indexOf(this.motivo);
                series[motivo].data[planta] = this.dias_laborales;
            })
            console.log('series', series);

            grafico_planta_motivo(
                series
                , plantas
            );

        },
        error: function (xhr) {
            // alert("An error occured: " + xhr.status + " " + xhr.statusText);
            console.log(xhr);
        },
        complete: function () {
            setTimeout(function () {
                // Notiflix.Block.remove('#tabla_planta_motivo');
            }, 400);
        }
    })
}

function grafico_planta_motivo(series, categories) {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Ausencias por planta motivo'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total ausencias'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: series
    });
}