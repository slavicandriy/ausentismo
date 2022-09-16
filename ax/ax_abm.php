<?php
require_once('ax_functions_php7.php');

function genera_query($parametros)
{

    $lista_querys["agrega_motivo"] = "
        INSERT INTO [dbo].[ausentismo_motivo](
          [id]
          ,[descripcion]
          )VALUES(
       '$parametros[id]'
       ,'$parametros[descripcion]'
          );
        ";

    $lista_querys["borra_motivo"] = "
        DELETE FROM [dbo].[ausentismo_motivo]
          WHERE [id] = '$parametros[id]'
        ;";

    $lista_querys["modifica_motivo"] = "
        UPDATE [dbo].[ausentismo_motivo]
        SET [descripcion] = '$parametros[descripcion]'
          WHERE [id] = '$parametros[id]'
        ;";

    $lista_querys["get_listado_motivos"] = "
        SELECT [id]
              ,[descripcion]
      FROM [CES].[dbo].[ausentismo_motivo]
        ";

    return $lista_querys[$parametros['query']];
}


