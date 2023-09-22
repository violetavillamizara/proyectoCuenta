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
})

addEventListener("DOMContentLoaded", async()=>{
    const tabla = document.querySelector("table");
    const tbody = tabla.querySelector("tbody");
    let res = await(await fetch(uri).json);
    console.log(res);
    res.map((element) => {
        const tr=`
            <tr>
                <td>${element.id}</td>
                <td>${element.caja}</td>
                <td>${element.monto}</td>
                <td>
                <button id="${element.id}" class="edit">Edit</button></td>
                <button id="${element.id}" class="delet">Delete</button>
            </tr>
        `;
        tbody.insertAdjacentElement("beforeend", tr);
    });
});



const delet = async (id)=>{
    let config ={
        method:"DELETE",
        headers:{"content-type":"application/json"}
    }
    let res = await (await fetch(uri + "/" + id, config)).json();
}

const edit = async (id)=>{
    const edit =document.querySelector(".edit");
    edit.addEventListener("click", (e)=>{
        e.preventDefault();
        
    })
    let config ={
        method:"PUT",
        headers:{"content-type":"application/json"},
        body: JSON.stringify()
    }
    let res = fetch(uri + "/" + id, config);
}