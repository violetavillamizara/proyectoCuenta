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
    let res = await(await fetch(uri).json);
    const tabla=document.querySelector("table");
    const tr=document.querySelector("tbody");
    res.forEach(element => {
        tr.insertAdjacentHTML=`
            <tr>
                <td>${res.id}</td>
                <td>res.caja</td>
                <td>res.monto</td>
                <td></td>
            </tr>
        `;
    });
})



const delet = async (id)=>{
    e.preventDefault();
    const datos=Object.fromEntries(new FormData(e.target));
    let config ={
        method:"DELETE",
        headers:{"content-type":"application/json"}
    }
    let res = await (await fetch(uri, config)).json();
}