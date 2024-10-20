url = 'https://jsonplaceholder.typicode.com/posts'
urlPhoto = 'https://jsonplaceholder.typicode.com/photos'

fetch(url)
    .then((response) => response.json())
    .then((data) =>{
    const containerTable = document.getElementById('table')

    let table = '';
    data.forEach(function(registros){
        table += 
        `
          <tr id="row-${registros.id}">
                <td>${registros.id}</td>
                <td>${registros.title}</td>
                <td>${registros.body}</td>               
                <td><button class="btn btn-secondary" onclick="dataRellenar(${registros.id})" >Edit</button></td>
                <td><button class="btn btn-danger" onClick="eliminarData(${registros.id})" >Delete</button></td>
          </tr>

        `
    });
    containerTable.innerHTML = table;
})

function getPhoto(){
  const id = document.getElementById('idGetPhoto').value;

  fetch(`${urlPhoto}/${id}`)
    .then((response ) => response.json())
    .then((data) =>{
      const getCard = document.getElementById('card-get')
      let card = '';
      card =
        `
        <img src="${data.url}" class="card-img-top" alt="...">
        <div class="card-body">
           <h5 class="card-title">ID: ${data.id}</h5>
           <p class="card-text">${data.title}</p>
        </div>
        `
    getCard.innerHTML = card;
  })
}
function crearRegistro(){
    event.preventDefault(); 
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
        .then((data) =>{
          console.log('Nuevo registro creado', data);
          agregarData(data)
      }).catch((error) =>{
        console.error('Error en la creacion del registro:', error);
      })
}

function editarRegistro(){
  event.preventDefault(); 
  const id = document.getElementById('ID').value;
  const titleActualizado = document.getElementById('editTitle').value;
  const bodyActualizado = document.getElementById('editBody').value;

    fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: titleActualizado,
          body: bodyActualizado,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((data) =>{
      const container = document.getElementById('card-edit-put')
      let card = '';
      card =
      `	          <h3>ID ${data.id}</h3>
                  <h4>Title : ${data.title}</h4>
                  <p>${data.body}</p>        
      `
      container.innerHTML = card;
    }).catch((error)=>{
        console.log('Error al actualizar: ', error)
    })
}
function eliminarData(id) {
  Swal.fire({
    title: `¿Está seguro de eliminar el registro con ID: ${id}?`,
    text: "No se pueden revertir los cambios.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#008000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, Eliminar"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`${url}/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json())
        .then((data) => {
          console.log('Registro eliminado:', data);
          removerFila(id); 
          Swal.fire({
            title: "Eliminado!",
            text: "Tu registro ha sido eliminado correctamente.",
            icon: "success"
          });
      });
    }
  });
}

function agregarData(registros){
  const tableContainer = document.getElementById('table')
  const row = 
  `        
              <tr id="row-${registros.id}">
                <td>${registros.id}</td>
                <td>${registros.title}</td>
                <td>${registros.body}</td>
                <td><button class="btn btn-secondary" onclick="dataRellenar(${registros.id})" >Edit</button></td>
                <td><button class="btn btn-danger" onClick="eliminarData(${registros.id})" >Delete</button></td>
              </tr>
  `
  tableContainer.innerHTML += row
}

function dataRellenar(id){
  fetch(`${url}/${id}`)
  .then((response) => response.json())
  .then((data) =>{
    document.getElementById('ID').value = data.id;
    document.getElementById('editTitle').value = data.title;
    document.getElementById('editBody').value = data.body;
  })
}

function removerFila(id){
  const row = document.getElementById(`row-${id}`)
  row.remove();
}