// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
    $('#usuarios').DataTable();

    actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
    document.getElementById('emailUsuario').outerHTML = localStorage.email;
}

async function cargarUsuarios() {

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();

    let listado = '';
    usuarios.forEach(e => {
        let usuario = `
        <tr>
        <td>${e.id}</td>
        <td>${e.nombre} ${e.apellido}</td>
        <td>${e.email}</td>
        <td>${e.telefono}</td>
        <td><a href="#" onclick="eliminarUsuario(${e.id})" class="btn btn-danger btn-circle">
                <i class="fas fa-trash"></i>
            </a>
        </td>
        </tr>`

        listado += usuario;
    });
    document.querySelector('#usuarios tbody').innerHTML = listado;

    console.log(usuarios);
}

function getHeaders(){
    return {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Autorization': localStorage.token
           };
}

async function eliminarUsuario(id) {

    if (!confirm("¿Desea eliminar este usuario?")){
        return;
    }
    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    location.reload();
}