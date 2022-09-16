<?php
require_once('ax_functions_php7.php');

function genera_query($parametros)
{


    $lista_querys["get_select_legajo"] = "
              SELECT legajo AS id 
            ,apellido + ' ' + nombres AS descripcion
            FROM dbo.sistema_externo_tabla_empleados
            WHERE fecha_egreso IS null
        ";
    $lista_querys["get_select_motivo"] = "
              SELECT *
            FROM [dbo].[ausentismo_motivo]  
        ";
 $lista_querys["check_overlap"] = "
              SELECT *
            FROM [dbo].[ausentismo_cab]  
            WHERE 1=1
            AND legajo = '$parametros[legajo]'
             AND (
       fecha_ausencia BETWEEN '$parametros[fecha_ausencia]' AND  '$parametros[alta_ausencia]'
      OR alta_ausencia BETWEEN '$parametros[fecha_ausencia]' AND  '$parametros[alta_ausencia]'
      OR '$parametros[fecha_ausencia]'  BETWEEN fecha_ausencia AND  alta_ausencia
      OR '$parametros[alta_ausencia]'  BETWEEN fecha_ausencia AND  alta_ausencia
      )
        ";

    $lista_querys["agrega_ausencia"] = "
          INSERT INTO [dbo].[ausentismo_cab](
              [legajo]
              ,[id_motivo]
              ,[fecha_ausencia]
              ,[alta_ausencia]
              ,[observaciones]
          )VALUES(
       '$parametros[legajo]'
       ,'$parametros[id_motivo]'
       ,'$parametros[fecha_ausencia]'
       ,'$parametros[alta_ausencia]'
       ,'$parametros[observaciones]'
          )
        ";

    $lista_querys["borra_ausencia"] = "
        DELETE FROM  [dbo].[ausentismo_cab]
          WHERE [id] = '$parametros[id]'
        ;";

    $lista_querys["modifica_motivo"] = "
        UPDATE  [dbo].[ausentismo_cab]
        SET [id_motivo] = '$parametros[id_motivo]' 
          WHERE [id] = '$parametros[id]'
        ;";
    $lista_querys["modifica_observacion"] = "
        UPDATE  [dbo].[ausentismo_cab]
        SET [observaciones] = '$parametros[observaciones]' 
          WHERE [id] = '$parametros[id]'
        ;";


    $lista_querys["get_listado_ausencias"] = "
            SELECT TOP 50
		c.* 
		,m.descripcion as motivo
		,a.AREA_DESCR as sector
        ,convert (varchar(10),c.fecha_ausencia ,103) as fecha_ausenciaFix 
        ,convert (varchar(10),c.alta_ausencia ,103) as alta_ausenciaFix 
		,v.*
		,p.[SUC_DESCR] as planta
		,p.[SUC_COD] as planta_id
  FROM [dbo].[ausentismo_cab] c
  LEFT JOIN dbo.sistema_externo_tabla_empleados v ON c.legajo=v.legajo
  LEFT JOIN [dbo].[ausentismo_motivo] m ON c.id_motivo=m.id
  LEFT JOIN [dbo].[sistema_externo_tabla_areas] a ON v.codigo_sector=a.AREA_COD
  LEFT JOIN [dbo].[sistema_externo_tabla_plantas] p ON v.[planta]=p.SUC_COD
    ORDER BY c.id DESC
        ";

    return $lista_querys[$parametros['query']];
}

