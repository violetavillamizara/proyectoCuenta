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