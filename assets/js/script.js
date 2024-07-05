async function get_data(){
    try{
        const data = await fetch("https://mindicador.cl/api/")
        const res_data= await data.json()

        return res_data
       
    }
    catch(error){
        console.log(error)
    }
    
}

const entrada=document.querySelector("#entrada")


async function generar_datos(cambio){
    let valor_input=Number(entrada.value)
    const data= await get_data()
    const valor=Number(data[cambio].valor)
    let resultado=Math.round((valor_input/valor)*100)/100

    return resultado
}

const cambio = document.getElementById("tipos_cambio");



async function get_change(){
    const res=document.querySelector("#res")
    const cambio = document.getElementById("tipos_cambio");
    let resultado = await generar_datos(cambio.value)
    res.innerHTML=''
    console.log(cambio.value)
    if(cambio.value=="dolar"){
        res.innerHTML=`USD ${resultado}`
    }else{
        res.innerHTML=`&#8364 ${resultado}`
    }
    
}

function renderGrafica() {
    /*
    const monedas = await getMonedas();
    const config = prepararConfiguracionParaLaGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
    */
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = ['enero','febrero','marzo'];
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = [1,2,2];
    const config = {
        type: tipoDeGrafica,
        data: {
        labels: nombresDeLasMonedas,
        datasets: [
        {
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores
        }
        ]
        }
    }
    console.log(config)
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}
renderGrafica();

/*
const cambio = document.getElementById("tipos_cambio");
let tipo_cambio=cambio.value
cambio.addEventListener("change", function() {
    tipo_cambio = cambio.value;
});


function get_change(){
    var tipo_cambio = document.getElementById("tipos_cambio");
    console.log(tipo_cambio.value)

}*/