const uri = "https://651673ef09e3260018c9c8d8.mockapi.io/cuentaIE";
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const datos = Object.fromEntries(new FormData(e.target));
  datos.monto = typeof datos.monto === "string" ? Number(datos.monto) : 0;
  console.log(datos);

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
});

addEventListener("DOMContentLoaded", async () => {
  const tabla = document.querySelector("table");
  const tbody = tabla.querySelector("tbody");

  const res = await fetch(uri);
  const data = await res.json();

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
  });

  delet();
  edit();
  balance();
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
      editBtn.setAttribute("data-edit-id", id);
    });
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const editId = e.target.getAttribute("data-edit-id");
  if (editId) {
    subir(editId);
  }
});

const subir = async (id) => {
  const valor = document.querySelector("#valor").value;
  const tipo = document.querySelector('input[name="caja"]:checked').value;

  let config = {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ monto: Number(valor), caja: tipo }),
  };

  let res = await fetch(uri + "/" + id, config);
  if (res.ok) {
    console.log("Registro actualizado");
    window.location.reload();
  } else {
    console.error("Error al actualizar el registro");
  }
};

const balance = () => {
  let total = 0;
  const valorInput = document.querySelector("#valor");
  const valor = parseFloat(valorInput.value);
  const input = document.querySelector('input[name="caja"]:checked').value;

  if (!isNaN(valor)) {
    if (input === "ingreso") {
      total += valor;
    } else if (input === "egreso") {
      total -= valor;
    }
  }

  const span = document.querySelector("h3 span");
  span.innerText = total;
};

