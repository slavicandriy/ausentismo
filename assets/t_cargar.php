<template id="t_rows_listado">
    <tr class="click_derecho_custom " data-id="{{id}}">
        <td>{{id}}</td>
        <td>{{legajo}}</td>
        <td>{{apellido}} {{nombres}}</td>
        <td>{{planta_id}} - {{planta}}</td>
        <td>{{sector}}</td>
        <td data-id="{{id}}" data-id_motivo="{{id_motivo}}" class="modifica-motivo">{{motivo}}</td>
        <td>{{fecha_ausenciaFix}}</td>
        <td>{{alta_ausenciaFix}}</td>
        <td data-id="{{id}}" data-observaciones="{{observaciones}}" class="modifica-observaciones">{{observaciones}}</td>
    </tr>
</template>

<template id="t_rows_productos">
    <tr>
        <td>{{codigo}} - {{PrdTxt}}</td>
        <td>{{stock}}</td>
    </tr>
</template>