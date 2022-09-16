<div id="modal-motivo" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modifica Motivo</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modal-motivo-body" class="modal-body">

                <label>ID</label>
                <input class="form-control" readonly type="text" name="id" value="" id="id_nuevo_motivo">
                <label>Motivo</label>
                <select id="select_nuevo_motivo" name="id_motivo" class="form-select form-group" required>
                    <option value="" disabled selected>---Seleccione---</option>
                </select>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div id="modal-observaciones" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modifica Observacion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modal-certificado-body" class="modal-body">
                <label>ID</label>
                <input class="form-control" readonly type="text" name="id" value="" id="id_nuevo_observaciones">
                <label>Observacion</label>
                <textarea id="nuevo_observaciones" class="form-control" name="observaciones" rows="3"></textarea>
            </div>
            <div class="modal-footer">
                <button id="btn-modifica-observacion" type="button" class="btn btn-outline-primary">
                    Guardar
                </button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>