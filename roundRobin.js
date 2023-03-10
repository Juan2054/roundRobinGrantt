/* 
Por: Juan Alejandro Orozco Ospina
     Juan Camilo Palleja Raigosa
*/

resultado = [];
resultadoFormatoGrafico = [];
tablita = [];
tablon = [];

function calcularRR(objeto,quantum){
    resultado = [];
    resultadoFormatoGrafico = [];
    tiempo = 0;
    procesos = [...objeto];
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
            tiempo = tiempo + quantum;
        }
        else{
            aux.tf = aux.ti + aux.rafaga;
            resultado.push(aux)
            tiempo = tiempo + (aux.tf-aux.ti);
        }  
    } 
    console.log("Tabla Estados:",procesos);
    tablita = procesos;
}

function formatoGrafico(){
    copiaR = [...resultado];
    datasets = {};
    data = [];
    while(copiaR.length > 0){
        buscar = Object.assign({}, copiaR[0]);
        dataset = {
                    label: buscar.name,
                    data: [{x:[buscar.ti,buscar.tf],y:buscar.name}],
                    borderWidth: 2,
                    borderSkipped: false
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

function construirChart(ctx){
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
}

function recibirDatos(){
    datos = [];
    objeto = [];
    quantum = document.querySelector('#quantum-receiver').value;
    quantum = Number(quantum);
    if(quantum <= 0 || !quantum){
        alert("ERROR. QUANTUM DEBE SER MAYOR A 0")
        return;
    }
    vector = document.querySelector('#data-receiver').value;
    regexObj = /(\w+:\d+(\s|,)?$)+/;
    if(!regexObj.test(vector)){
        alert("ERROR. LA SINTAXIS DE LOS PROCESOS ES INCORRECTA")
        return;
    }
    separador = vector.split(/ |,/);
    for(let i = 0; i < separador.length; i++){
        dato = separador[i].split(':');
        datos.push(dato);
    }

    for(let i = 0; i < datos.length; i++){
        datos[i][1] = Number(datos[i][1]);
        prueba = {name:datos[i][0],rafaga:datos[i][1]};
        if(datos[i][0] != '' && datos[i][1]){
            objeto.push(prueba); 
        }                 
    }
    
    if(objeto.length <= 0){
        alert("ERROR. VERIFIQUE LOS PROCESOS")
        return;
    }

    form = document.querySelector('.card');
    grafico = document.querySelector('#chart-wrapper');
    form.style.display = 'none';
    grafico.style.display = 'inline-block';
    calcularRR(objeto,quantum);
    formatoGrafico();
    try{
        const ctx = document.getElementById('grantt');
        construirChart(ctx);
    }
    catch(error){
        alert("ERROR. DEBE LIMPIAR EL GR??FICO PRIMERO")
    }
}

function borrarGrafico(){
    form = document.querySelector('.card');
    grafico = document.querySelector('#chart-wrapper');
    form.style.display = 'block';
    grafico.style.display = 'none';
    Chart.helpers.each(Chart.instances, function (instance) {
        instance.destroy();
      }); 
}

function mostrarTabla(){
    tablon = [];
    grafico = document.querySelector('#chart-wrapper');
    tabla = document.querySelector('#example');
    botonTabla = document.querySelector('#table-button');
    tabla.style.display = 'table';
    botonTabla.style.display = 'block';
    grafico.style.display = 'none';
    string = "";
    dato = [];
    for(let i = 0; i < tablita.length; i++){
        string = tablita[i].name + ' ' + tablita[i].rafaga;
        dato = string.split(' ');
        tablon.push(dato);
    }
    console.log(tablon);
    $('#example').DataTable({
        "order": [],
        "scrollY": "600px",
        "scrollCollapse": true,
        "destroy": true,
        data: tablon,
        columns: [
            { title: 'Proceso' },
            { title: 'Rafaga' },
        ]
    });
}

function cerrarTabla(){
    grafico = document.querySelector('#chart-wrapper');
    contenedorTabla = document.querySelector('#example_wrapper');
    tabla = document.querySelector('#example');
    botonTabla = document.querySelector('#table-button');
    contenido = $('#example').DataTable();
    contenido.clear().destroy();
    contenedorTabla.style.display = 'none';
    tabla.style.display = 'none';
    botonTabla.style.display = 'none';
    grafico.style.display = 'inline-block';
}



