function calcularRR(objeto,quantum){
    procesos = objeto;
    resultado = []
    for (i = 0; i < procesos.length; i++) {
        aux = Object.assign({}, procesos[i]);
        if(procesos[i].rafaga > quantum){
            aux.rafaga = aux.rafaga - quantum;
            procesos.push(aux)
            procesoRealizado = {name:aux.name,rafaga:quantum};
            resultado.push(procesoRealizado)
        }
        else{
            resultado.push(aux)
        }
    } 
    console.log(resultado);
    console.log(procesos);
}

function recibirDatos(){
    datos = [];
    objeto = [];
    quantum = document.querySelector('#quantum-receiver').value;
    vector = document.querySelector('#data-receiver').value;
    separador = vector.split(' ');
    for(let i = 0; i < separador.length; i++){
        dato = separador[i].split(':');
        datos.push(dato);
    }
    for(let i = 0; i < datos.length; i++){
        for(let o = 0; o < datos[i].length; o++){
            datos[i][1] = Number(datos[i][1])
        }
    }
    for(let p = 0; p < datos.length; p++){
        prueba = {name:datos[p][0],rafaga:datos[p][1]};
        objeto.push(prueba);
    }
    console.log(objeto)
    calcularRR(objeto,quantum)
}

