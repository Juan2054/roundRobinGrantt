
function calcularRR(){
    quantum = 2;
    procesos = [{name:"P0",rafaga:5},{name:"P1",rafaga:4}];
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

calcularRR();