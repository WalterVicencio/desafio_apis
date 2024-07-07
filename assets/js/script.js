async function get_data(){
    try{
        const data = await fetch("https://mindicador.cl/api/")
        const res_data= await data.json()
        return res_data
       
    }
    catch(e){
        const errorSpan = document.getElementById("errorSpan");
        errorSpan.innerHTML = `Algo salió mal! Error: ${e.message}`;
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
    if(cambio.value=="dolar"){
        res.innerHTML=`USD ${resultado}`
    }else{
        res.innerHTML=`&#8364 ${resultado}`
    }
    var datos_fechas_anteriores= await renderGrafica()
    generar_grafica(datos_fechas_anteriores[0],datos_fechas_anteriores[1])
    
}

async function obtener_valores_fechas(fecha){
    try{
        const data_fecha = await fetch("https://mindicador.cl/api/"+cambio.value+"/"+fecha)
        const res_data_fecha= await data_fecha.json()
        const retorno=res_data_fecha.serie[0]
        return retorno
    }
    catch(e){
        const errorSpan = document.getElementById("errorSpan");
        errorSpan.innerHTML = `Algo salió mal! Error: ${e.message}`;
    }
}

function generar_grafica(labels,valores_fechas){

    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = labels;
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = valores_fechas;
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

    const chartDOM = document.getElementById("myChart");
    if (window.grafica) {
        window.grafica.clear();
        window.grafica.destroy();
    }
    window.grafica = new Chart(chartDOM, config);
    
}


async function renderGrafica() {
    

    const fecha = new Date();
    const dia_hoy = fecha.getDate();
    const mes_hoy = fecha.getMonth()+1;
    const ano_hoy = fecha.getFullYear();

    var TuFecha = new Date(dia_hoy+'-'+mes_hoy+'-'+ano_hoy);
    var dias = parseInt(10);
    TuFecha.setDate(TuFecha.getDate() - dias);
    let ultima_fecha=TuFecha.getDate() + '-' + (TuFecha.getMonth() + 1) + '-' + TuFecha.getFullYear()
    let fechas_anteriores=[]
    let valores_fechas=[]
    for (let i = 1; i < 11; i++) {
        fechas_anteriores.push(ultima_fecha)
        let valores_fecha = await obtener_valores_fechas(ultima_fecha)
        console.log(valores_fecha)
        if(valores_fecha==undefined){
            console.log("este es un undefined")
            valores_fecha=0
            valores_fechas.push(valores_fecha)
        }else{
            valores_fechas.push(valores_fecha.valor)
        }
        
        TuFecha.setDate(TuFecha.getDate() + 1);
        ultima_fecha=TuFecha.getDate() + '-' + (TuFecha.getMonth() + 1) + '-' + TuFecha.getFullYear()
    }

    return [fechas_anteriores,valores_fechas]
}