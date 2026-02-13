//Realizar las operaciones Eliminar y Editar

function validateForm() {
  let email = document.getElementById("email").value.trim();
  let name = document.getElementById("name").value.trim();
  let doc = document.getElementById("doc").value.trim();

  if (email === "" || name === "" || doc === "") {
    alert("Por favor, complete todos los campos.");
    return false;
  }

  if (!email.includes("@")) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return false;
  }

  return true;
}

function showData() {
  let listData = localStorage.getItem("listData")
    ? JSON.parse(localStorage.getItem("listData"))
    : [];

  let html = "";
  listData.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.doc + "</td>";
    html += "<td>";
    html += "<button onclick='deleteData(" + index + ")' class='btn btn-danger me-2'>Eliminar</button>";
    html += "<button onclick='updateData(" + index + ")' class='btn btn-warning'>Editar</button>";
    html += "</td>";
    html += "</tr>";
  });

  document.querySelector("#tableData tbody").innerHTML = html;
}

window.onload = showData;

function addData() {
  if (validateForm() == true) {
    let email = document.getElementById("email").value.trim().toLowerCase();
    let name = document.getElementById("name").value.trim();
    let doc = document.getElementById("doc").value.trim();
    let index = document.getElementById("index").value;

    let listData = localStorage.getItem("listData")
      ? JSON.parse(localStorage.getItem("listData"))
      : [];

    // Verificar si el email o doc ya existe en la lista
    let exists = listData.some((item, i) => {
      if (index === "") {
        return item.email === email || item.doc === doc;
      } else {
        return i != index && (item.email === email || item.doc === doc);
      }
    });

    if (exists) {
      alert("El correo o documento ya existe.");
      return;
    }
    // Agregar o actualizar el dato

    if (index !== "") {
      listData[index] = { email, name, doc };
      document.getElementById("index").value = "";
    }
    // Si el índice no está vacío, actualizamos el dato existente,
    // de lo contrario, agregamos uno nuevo
    else {
      listData.push({ email, name, doc });
    }

    localStorage.setItem("listData", JSON.stringify(listData));
    showData();

    document.getElementById("email").value = "";
    document.getElementById("name").value = "";
    document.getElementById("doc").value = "";
  }
}

/* */


function deleteData(index) {
  let listData = localStorage.getItem("listData")
    ? JSON.parse(localStorage.getItem("listData"))
    : [];

  listData.splice(index, 1);
  localStorage.setItem("listData", JSON.stringify(listData));
  showData();
}

function updateData(index) {
  let listData = JSON.parse(localStorage.getItem("listData"));

  document.getElementById("email").value = listData[index].email;
  document.getElementById("name").value = listData[index].name;
  document.getElementById("doc").value = listData[index].doc;
  document.getElementById("index").value = index;
}