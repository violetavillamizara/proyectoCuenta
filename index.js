const uri="https://650c15b747af3fd22f67006b.mockapi.io/cuentaIE";
const form=document.querySelector("form");


form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const datos=Object.fromEntries(new FormData(e.target));
    datos.monto=(typeof datos.monto==="string") ? Number(datos.monto) : 0;
    console.log(datos);
    let config ={
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(datos)
    }
    let res = await (await fetch(uri, config)).json();
    console.log(res)
    window.location.reload();
});


addEventListener("DOMContentLoaded", async()=>{
    const tabla = document.querySelector("table"); 

    const tbody = tabla.querySelector("tbody");
    const res = await(await fetch(uri)).json();

    console.log(res);

    res.forEach((element) => {
        console.log(element)
        const tr=`
            <tr>
                <td id="uno" >${element.id}</td>
                <td id="dos" >${element.caja}</td>
                <td id="tres" >${element.monto}</td>
                <td>
                <button id="${element.id}" class="edit">Edit</button>
                <button id="${element.id}" class="delet">Delete</button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", tr);
    });

    delet();
    // const btnEdit = document.querySelectorAll(".edit");
    // btnEdit.addEventListener("click", edit())? edit():{};
    // balance();
    balance();
});



const delet = async ()=>{
    const btnDelete = document.querySelectorAll(".delet");
    btnDelete.forEach((element)=>{
        
        element.addEventListener("click", async(e)=>{
            const id = e.target.getAttribute("id");
            let config ={
                method:"DELETE"
            }
            await fetch(uri + "/" + id, config);
            window.location.reload();
        });
        balance();
    });
};


const edit = async ()=>{
    const btnEdit = document.querySelectorAll(".edit");
    btnEdit.forEach((element)=>{

    element.addEventListener("click", async(e)=>{
        const row =element.closest("tr");
        console.log(row);
        const id = row.querySelector("#uno");
        const tipo = row.querySelector("#dos");
        const valor = row.querySelector("#tres");
        console.log(id,tipo,valor);

        document.querySelector("#valor").value=valor;
        document.querySelector('input[value="${tipo}"]').checked=true;

        const editBtn=document.querySelector("button");
        editBtn.textContent="update";

        subir();
    })
});
};

const subir= async()=>{
    let config ={
        method:"PUT",
        headers:{"content-type":"application/json"},
        body: JSON.stringify()
    }
    let res = await (await fetch(uri + "/" + id, config)).json();
}

// const balance= async()=>{
//     let total=0;
//     const valor=document.querySelectorAll("#valor");
//     const input=document.querySelectorAll('[name="caja"]');
//     let actual=(input===value==="ingreso")?total+=valor:total-=valor;
//     const span=document.querySelector("span");
//     span.innerText=total;
// };

const balance = async () => {
    let total = 0;
    const valor = parseFloat(document.querySelectorAll("#valor").value);
    const input = document.querySelectorAll('[name="caja"]').value;
  
    if (input === "ingreso") {
      total += valor;
    } else if (input === "egreso") {
      total -= valor;
    }
  
    const span = document.querySelector("span");
    span.innerText = total;
  };