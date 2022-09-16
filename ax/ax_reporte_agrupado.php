<?php
require_once('ax_functions_php7.php');

function genera_query($parametros)
{

    $lista_querys["get_agrupado_ausencias_planta"] = "
           SELECT 
                  planta
                ,SUM(dias_laborales) AS dias_laborales
           FROM(
            SELECT 
		CAST (p.[SUC_COD] AS varchar) + '-' + p.SUC_DESCR as planta
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
  FROM [dbo].[ausentismo_cab] c
  LEFT JOIN dbo.sistema_externo_tabla_empleados v ON c.legajo=v.legajo
  LEFT JOIN [dbo].[ausentismo_motivo] m ON c.id_motivo=m.id
  LEFT JOIN [dbo].[sistema_externo_tabla_areas] a ON v.codigo_sector=a.AREA_COD
  LEFT JOIN [dbo].[sistema_externo_tabla_plantas] p ON v.[planta]=p.SUC_COD
             WHERE 1=1
             $parametros[restriccion_planta]
      AND (
       fecha_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR alta_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR '$parametros[fecha_desde]'  BETWEEN fecha_ausencia AND  alta_ausencia
      OR '$parametros[fecha_hasta]'  BETWEEN fecha_ausencia AND  alta_ausencia
      )
      AND '$parametros[fecha_hasta]' >= '$parametros[fecha_desde]'
    ) tbl
    GROUP BY planta
        ";

    $lista_querys["get_agrupado_ausencias_motivo"] = "
           SELECT 
                  motivo
                ,SUM(dias_laborales) AS dias_laborales
           FROM(
            SELECT 
                 CAST (m.id AS varchar) + ' - ' + m.descripcion as motivo
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
  FROM [dbo].[ausentismo_cab] c
  LEFT JOIN dbo.sistema_externo_tabla_empleados v ON c.legajo=v.legajo
  LEFT JOIN [dbo].[ausentismo_motivo] m ON c.id_motivo=m.id
  LEFT JOIN [dbo].[sistema_externo_tabla_areas] a ON v.codigo_sector=a.AREA_COD
  LEFT JOIN [dbo].[sistema_externo_tabla_plantas] p ON v.[planta]=p.SUC_COD
             WHERE 1=1
                          $parametros[restriccion_planta]

      AND (
       fecha_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR alta_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR '$parametros[fecha_desde]'  BETWEEN fecha_ausencia AND  alta_ausencia
      OR '$parametros[fecha_hasta]'  BETWEEN fecha_ausencia AND  alta_ausencia
      )
      AND '$parametros[fecha_hasta]' >= '$parametros[fecha_desde]'
    ) tbl
    GROUP BY motivo
        ";

    $lista_querys["get_agrupado_ausencias_planta_motivo"] = "
           SELECT 
             planta     
             ,motivo
                ,SUM(dias_laborales) AS dias_laborales
           FROM(
            SELECT 
		CAST (p.[SUC_COD] AS varchar) + '-' + p.SUC_DESCR as planta
                 ,CAST (m.id AS varchar) + ' - ' + m.descripcion as motivo
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
  FROM [dbo].[ausentismo_cab] c
  LEFT JOIN dbo.sistema_externo_tabla_empleados v ON c.legajo=v.legajo
  LEFT JOIN [dbo].[ausentismo_motivo] m ON c.id_motivo=m.id
  LEFT JOIN [dbo].[sistema_externo_tabla_areas] a ON v.codigo_sector=a.AREA_COD
  LEFT JOIN [dbo].[sistema_externo_tabla_plantas] p ON v.[planta]=p.SUC_COD
             WHERE 1=1
                          $parametros[restriccion_planta]

      AND (
       fecha_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR alta_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR '$parametros[fecha_desde]'  BETWEEN fecha_ausencia AND  alta_ausencia
      OR '$parametros[fecha_hasta]'  BETWEEN fecha_ausencia AND  alta_ausencia
      )
      AND '$parametros[fecha_hasta]' >= '$parametros[fecha_desde]'
    ) tbl
    GROUP BY planta, motivo
    ORDER BY planta, motivo
        ";

    $lista_querys["get_datos_grafico_agrupado"] = "
           SELECT 
             planta     
             ,motivo
                ,SUM(dias_laborales) AS dias_laborales
           FROM(
            SELECT 
		p.SUC_DESCR as planta
                 , m.descripcion as motivo
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
  FROM [dbo].[ausentismo_cab] c
  LEFT JOIN dbo.sistema_externo_tabla_empleados v ON c.legajo=v.legajo
  LEFT JOIN [dbo].[ausentismo_motivo] m ON c.id_motivo=m.id
  LEFT JOIN [dbo].[sistema_externo_tabla_areas] a ON v.codigo_sector=a.AREA_COD
  LEFT JOIN [dbo].[sistema_externo_tabla_plantas] p ON v.[planta]=p.SUC_COD
             WHERE 1=1
                          $parametros[restriccion_planta]

      AND (
       fecha_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR alta_ausencia BETWEEN '$parametros[fecha_desde]' AND  '$parametros[fecha_hasta]'
      OR '$parametros[fecha_desde]'  BETWEEN fecha_ausencia AND  alta_ausencia
      OR '$parametros[fecha_hasta]'  BETWEEN fecha_ausencia AND  alta_ausencia
      )
      AND '$parametros[fecha_hasta]' >= '$parametros[fecha_desde]'
    ) tbl
    GROUP BY planta, motivo
        ";


    return $lista_querys[$parametros['query']];
}
