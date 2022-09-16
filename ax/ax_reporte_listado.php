<?php
require_once('ax_functions_php7.php');

function genera_query($parametros)
{

    $lista_querys["get_select_motivo"] = "
              SELECT *
            FROM [dbo].[ausentismo_motivo]  
        ";

    $lista_querys["get_select_planta"] = "
              SELECT [SUC_COD] AS id
      ,[SUC_DESCR] AS  descripcion
            FROM [dbo].[sistema_externo_tabla_plantas]  
        ";


    $id_motivo = $parametros['id_motivo'];
    $id_planta = $parametros['id_planta'];

    if ($id_motivo == 'T'){
        $id_motivo = "";
    }else{
        $id_motivo = "AND id_motivo = $id_motivo";
    }

    if ($id_planta == 'T'){
        $id_planta = "";
    }else{
        $id_planta = "AND SUC_COD = $id_planta";
    }



    $lista_querys["get_listado_ausencias"] = "
            SELECT TOP 300
		c.* 
		,m.descripcion as motivo
		,a.AREA_DESCR as sector
        ,convert (varchar(10),c.fecha_ausencia ,103) as fecha_ausenciaFix 
        ,convert (varchar(10),c.alta_ausencia ,103) as alta_ausenciaFix 
		,v.*
		,p.[SUC_DESCR] as planta
		,p.[SUC_COD] as planta_id
        ,DATEDIFF ( DAY , fecha_ausencia , alta_ausencia ) + 1 as dias_total
        ,DATEDIFF ( DAY ,   (
                                SELECT MAX(fecha_desde)
                                FROM (VALUES (fecha_ausencia),('$parametros[fecha_desde]')) AS fecha_desde(fecha_desde)
                                                                                                                   ) ,(
                                SELECT MIN(fecha_hasta)
                                FROM (VALUES (alta_ausencia),('$parametros[fecha_hasta]')) AS fecha_hasta(fecha_hasta)
                                                                                                                   )  ) - dbo.udf_FinesDeSemana(  (
                                SELECT MAX(fecha_desde)
                                FROM (VALUES (fecha_ausencia),('$parametros[fecha_desde]')) AS fecha_desde(fecha_desde)
                                                                                                                   ) ,(
                                SELECT MIN(fecha_hasta)
                                FROM (VALUES (alta_ausencia),('$parametros[fecha_hasta]')) AS fecha_hasta(fecha_hasta)
                                                                                                                   )  )                                                                                                                   
                                                                                                                   + 1 as dias_laborales
        ,DATEDIFF ( DAY ,   (
                                SELECT MAX(fecha_desde)
                                FROM (VALUES (fecha_ausencia),('$parametros[fecha_desde]')) AS fecha_desde(fecha_desde)
                                                                                                                   ) ,(
                                SELECT MIN(fecha_hasta)
                                FROM (VALUES (alta_ausencia),('$parametros[fecha_hasta]')) AS fecha_hasta(fecha_hasta)
                                                                                                                   )  ) + 1 as dias_rango                                                           
  FROM [dbo].[ausentismo_cab] c
  LEFT JOIN dbo.sistema_externo_tabla_empleados v ON c.legajo=v.legajo
  LEFT JOIN [dbo].[ausentismo_motivo] m ON c.id_motivo=m.id
  LEFT JOIN [dbo].[sistema_externo_tabla_areas] a ON v.codigo_sector=a.AREA_COD
  LEFT JOIN [dbo].[sistema_externo_tabla_plantas] p ON v.[planta]=p.SUC_COD
             WHERE 1=1
             AND (
                 c.legajo LIKE '%".$parametros['buscar']."%'
                    OR nombres LIKE '%".$parametros['buscar']."%'
                    OR apellido LIKE '%".$parametros['buscar']."%'
                    OR observaciones LIKE '%".$parametros['buscar']."%'
                    )
      $id_motivo
      $id_planta
      AND (
       fecha_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR alta_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR '$parametros[fecha_desde]'  BETWEEN fecha_ausencia AND  alta_ausencia
      OR '$parametros[fecha_hasta]'  BETWEEN fecha_ausencia AND  alta_ausencia
      )
      AND '$parametros[fecha_hasta]' >= '$parametros[fecha_desde]'
      
    ORDER BY c.id DESC
        ";


    return $lista_querys[$parametros['query']];
}
