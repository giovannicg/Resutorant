var count = 1;

function add_more_student(){
    count += 1;
    html='<div class="form-group">\
            <input type="text" class="from-control" name="name'+count+'" placeholder="Nombre" autofocus>\
            <button class="btn btn-dark float-right mt-2" onclick="add_more_student()">Añadir +</button>\
        </div>'
    var form =document.getElementById('payments_form')
    form.innerHTML+=html
}