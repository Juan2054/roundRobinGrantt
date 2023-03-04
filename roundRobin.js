quantum = 2;
resultado = [];
procesos = [];

function calcularRR(){
    tiempo = 0;
    procesos = [{name:"P0",rafaga:5},{name:"P1",rafaga:4}];
    for (i = 0; i < procesos.length; i++) {
        aux = Object.assign({}, procesos[i]);
        aux.ti = tiempo;
        if(procesos[i].rafaga > quantum){
            aux.rafaga = aux.rafaga - quantum;
            aux.tf = aux.ti + quantum;
            procesoRealizado = {name:aux.name,rafaga:quantum,ti:aux.ti,tf:aux.tf};
            resultado.push(procesoRealizado)
            delete aux.ti
            delete aux.tf
            procesos.push(aux)
        }
        else{
            aux.tf = aux.ti + aux.rafaga;
            resultado.push(aux)
        }
        tiempo = tiempo + quantum;
    } 
    console.log(resultado);
    console.log(procesos);
}

calcularRR();

resultadoFormatoGrafico = [];

formatoGrafico();
console.log(resultadoFormatoGrafico);

function formatoGrafico(){
    copiaR = [...resultado];
    datasets = {};
    data = [];
    while(copiaR.length > 0){
        buscar = Object.assign({}, copiaR[0]);
        dataset = {
                    label: buscar.name,
                    data: [{x:[buscar.ti,buscar.tf],y:buscar.name}],
                    borderWidth: 1
                  }
        copiaR.splice(0,1);
        for(i = 0; i < copiaR.length; i++) {
            if(copiaR[i].name == buscar.name){
                data = {x:[copiaR[i].ti,copiaR[i].tf],y:copiaR[i].name};
                dataset.data.push(data);
                copiaR.splice(i,1);
                i = i - 1; 
                
            }
        }
        resultadoFormatoGrafico.push(dataset);
    }
    
}

const ctx = document.getElementById('grantt');
      
new Chart(ctx, {
  type: 'bar',
  data: {
    datasets: resultadoFormatoGrafico
  },
  options: {
    indexAxis:'y',
    scales: {
      y: {
        beginAtZero: true,
        stacked:true
      }
    },
  }
});