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
});



const delet = async ()=>{
    //const res = await(await fetch(uri)).json();

    const btnDelete = document.querySelector(".delet");
    btnDelete.forEach((element)=>{
        const id = btnDelete[element].id
        element.addEventListener("click", async(e)=>{
            let config ={
                method:"DELETE"
            }
            let res = await fetch(uri + "/" + id, config);
        });
    });
}

const edit = async (id)=>{
    const btnEdit =document.querySelector(".edit");
    btnEdit.addEventListener("click", (e)=>{
        e.preventDefault();
        
    })
    let config ={
        method:"PUT",
        headers:{"content-type":"application/json"},
        body: JSON.stringify()
    }
    let res = await (await fetch(uri + "/" + id, config)).json();
};