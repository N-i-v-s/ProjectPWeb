$(document).ready(function () {
    var page = 1;
    var current_page = 1;
    var total_page = 0;
    var is_ajax_fire = 0;
    var dataCon;

    createHeadTable();
    createForm();
    createEditForm();
    manageData();

    function manageData() {
        $.ajax({
            dataType: 'json',
            url: 'getCategoria.php',
            data: {page: page}
        }).done(function (data) {
            total_page = Math.ceil(data.total / 10);
            current_page = page;

            $('#pagination').twbsPagination({
                totalPages: total_page,
                visiblePages: current_page,
                onPageClick: function (event, pageL) {
                    page = pageL;
                    if (is_ajax_fire != 0) {
                        getPageData();
                    }
                }
            });

            manageRow(data.data);
            is_ajax_fire = 1;
        });
    }

    function getPageData() {
        $.ajax({
            dataType: 'json',
            url: 'getCategoria.php',
            data: {page: page}
        }).done(function (data) {
            manageRow(data.data);
        });
    }

    function manageRow(data) {
        dataCon = data;
        var rows = '';
        var i = 0;
        $.each(data, function (key, value) {
            rows += '<tr>';
            rows += '<td>' + value.codcategoria + '</td>';
            rows += '<td>' + value.descricao + '</td>';
            rows += '<td data-id="' + i++ + '">';
            rows += '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item">Editar</button> ';
            rows += '<button class="btn btn-danger remove-item">Deletar</button>';
            rows += '</td>';
            rows += '</tr>';
        });

        $("tbody").html(rows);
    }

    function createHeadTable() {
        var rows = '<tr>';
        rows += '<th> Código </th>';
        rows += '<th> Descrição </th>';
        rows += '<th width="200px">Ação</th>';
        rows += '</tr>';
        $("thead").html(rows);
    }

    function createForm() {
        var html = '';
        html += '<div class="form-group">';
        html += '<label class="control-label" for="descricao">Descrição</label>';
        html += '<input type="text" name="descricao" class="form-control" required />';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<label class="control-label" for="tempo">Tempo</label>';
        html += '<input type="number" name="tempo" class="form-control" required />';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<label class="control-label" for="valMulta">Valor Multa</label>';
        html += '<input type="text" name="valMulta" class="form-control" required />';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<button type="submit" class="btn crud-submit btn-success">Salvar</button>';
        html += '</div>';
        $("#create-item").find("form").html(html);
    }

    function createEditForm() {
        var html = '<input type="hidden" name="codcategoria" class="edit-id">';
        html += '<div class="form-group">';
        html += '<label class="control-label" for="descricao">Descrição</label>';
        html += '<input type="text" name="descricao" class="form-control" required />';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<label class="control-label" for="tempo">Tempo</label>';
        html += '<input type="number" name="tempo" class="form-control" required />';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<label class="control-label" for="valMulta">Valor Multa</label>';
        html += '<input type="text" name="valMulta" class="form-control" required />';
        html += '</div>';
        html += '<div class="form-group">';
        html += '<button type="submit" class="btn crud-submit-edit btn-success">Salvar</button>';
        html += '</div>';
        $("#edit-item").find("form").html(html);
    }

    // Salvar Novo Registro
    $(".crud-submit").click(function (e) {
        e.preventDefault();
        var form_action = $("#create-item").find("form").attr("action");
        var descricao = $("#create-item").find("input[name='descricao']").val();
        var tempo = $("#create-item").find("input[name='tempo']").val();
        var valMulta = $("#create-item").find("input[name='valMulta']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {descricao: descricao, tempo: tempo, valMulta: valMulta}
        }).done(function (data) {
            $("#create-item").find("input[name='descricao']").val('');
            $("#create-item").find("input[name='tempo']").val('');
            $("#create-item").find("input[name='valMulta']").val('');
            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});
        });
    });

    // Preencher Modal ao clicar em Editar
    $("body").on("click", ".edit-item", function () {
        var index = $(this).parent("td").data('id');
        var item = dataCon[index];

        $("#edit-item").find("input[name='codcategoria']").val(item.codcategoria);
        $("#edit-item").find("input[name='descricao']").val(item.descricao);
        $("#edit-item").find("input[name='tempo']").val(item.tempo);
        $("#edit-item").find("input[name='valMulta']").val(item.valMulta);
    });

    // Salvar Edição
    $(".crud-submit-edit").click(function (e) {
        e.preventDefault();
        var form_action = $("#edit-item").find("form").attr("action");
        var codcategoria = $("#edit-item").find("input[name='codcategoria']").val();
        var descricao = $("#edit-item").find("input[name='descricao']").val();
        var tempo = $("#edit-item").find("input[name='tempo']").val();
        var valMulta = $("#edit-item").find("input[name='valMulta']").val();

        $.ajax({
            dataType: 'json',
            type: 'POST',
            url: form_action,
            data: {codcategoria: codcategoria, descricao: descricao, tempo: tempo, valMulta: valMulta}
        }).done(function (data) {
            getPageData();
            $(".modal").modal('hide');
            toastr.success(data.msg, 'Alerta de Sucesso', {timeOut: 5000});
        });
    });
});