const uri = "http://127.0.0.0:5011/cuentaIE";
const form = document.querySelector("form");
let total = 0;


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  datos.monto = typeof datos.monto === "string" ? Number(datos.monto) : 0;
  console.log(datos);

  const editBtn = document.querySelector("button[type='submit']");
  if(editBtn.textContent === "Update"){
    subir();
  }else{
    let config = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(datos),
    };
  
    let res = await fetch(uri, config);
    if (res.ok) {
      console.log("Registro exitoso");
      window.location.reload();
    } else {
      console.error("Error al agregar el registro");
    }
  }
});

addEventListener("DOMContentLoaded", async () => {
  const tabla = document.querySelector("table");
  const tbody = tabla.querySelector("tbody");

  const res = await fetch(uri);
  const data = await res.json();
  console.log(data)

  data.forEach((element) => {
    const tr = `
      <tr>
        <td>${element.id}</td>
        <td>${element.caja}</td>
        <td>${element.monto}</td>
        <td>
          <button id="${element.id}" class="edit">Edit</button>
          <button id="${element.id}" class="delet">Delete</button>
        </td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", tr);

    balance(element);
  });

  delet();
  edit();
});

const delet = () => {
  const btnDelete = document.querySelectorAll(".delet");
  btnDelete.forEach((element) => {
    element.addEventListener("click", async (e) => {
      const id = e.target.getAttribute("id");
      let config = {
        method: "DELETE",
      };
      let res = await fetch(uri + "/" + id, config);
      if (res.ok) {
        console.log("Registro eliminado");
        window.location.reload();
      } else {
        console.error("Error al eliminar el registro");
      }
    });
  });
};

const edit = () => {
  const btnEdit = document.querySelectorAll(".edit");
  btnEdit.forEach((element) => {
    element.addEventListener("click", (e) => {
      const row = element.closest("tr");
      const id = row.querySelector("td").textContent;
      const tipo = row.querySelector("td:nth-child(2)").textContent;
      const valor = row.querySelector("td:nth-child(3)").textContent;

      document.querySelector("#valor").value = valor;
      document.querySelector(`input[value="${tipo}"]`).checked = true;

      const editBtn = document.querySelector("button[type='submit']");
      editBtn.textContent = "Update";
      editBtn.setAttribute("data-edit", id);

    });
  });
};

const subir = async () => {
  const valor = document.querySelector("#valor").value;
  const tipo = document.querySelector('input[name="caja"]:checked').value;
  const editBtn = document.querySelector("button[type='submit']");
  const id = editBtn.dataset.edit

  let config = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ caja: tipo, monto: Number(valor) }),
  };

  let res = await fetch(uri + "/" + id, config);
  if (res.ok) {
    console.log("Registro actualizado");
    window.location.reload();
  } else {
    console.error("Error al actualizar el registro");
  }
};

const balance = (element) => {
  console.log(element)

  if (element.caja==="ingreso") {
      total += element.monto;
    } else {
      total -= element.monto;
    }
    const span = document.querySelector("h3");
    span.innerHTML=`<h3>Balance actual:${total}</h3>`;
  }

  

