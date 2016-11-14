var procesador1 = new Procesador(5);
var procesador2 = new Procesador(5);
var procesador3 = new Procesador(5);
var p1=0, p2=0, p3= 0; // variables para llevar la cuenta de los procesos por cada procesador
var hilo1,hilo2,hilo3;


/* --------------Main--------------------- */
$(document).ready(function(){

	preestablecer();

	/* Botones para crear procesos */
	$("#crear1").click(function(){
		var nombre = $("#nombre1").val();
		var tiempo = $("#tiempo1").val();
		var recurso = $("#recurso1").val();
		var proceso = new Proceso(p1,nombre, tiempo, recurso);
		procesador1.CrearProceso(proceso);
			
		p1++;
		preestablecer();
		$("#listos1").html(dibujarCola(procesador1.listos));
	});
	$("#crear2").click(function(){
		var nombre = $("#nombre2").val();
		var tiempo = $("#tiempo2").val();
		var recurso = $("#recurso2").val();
		var proceso = new Proceso(p2,nombre, tiempo, recurso);
		procesador2.CrearProceso(proceso);

		p2++;
		preestablecer();
		$("#listos2").html(dibujarCola(procesador2.listos));
	});
	$("#crear3").click(function(){
		var nombre = $("#nombre3").val();
		var tiempo = $("#tiempo3").val();
		var recurso = $("#recurso3").val();
		var proceso = new Proceso(p3,nombre, tiempo, recurso);
		procesador3.CrearProceso(proceso);

		p3++;
		preestablecer();
		$("#listos3").html(dibujarCola(procesador3.listos));
	});

	/* botones correr procesadores */
	$("#ejecutar1").click(function(){
		$("#ejecutar1").attr("disabled",true);
		$("#interrumpir1").attr("disabled",false);
		hilo1 = setInterval(function(){
			procesador1.CorrerProcesador(recursos);
			$("#listos1").html(dibujarCola(procesador1.listos));
			$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
			$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
			$("#terminados1").html(dibujarCola(procesador1.terminados));
			$("#cpu1").html(dibujarCola(procesador1.CPU));
			$("#cronometro1").text(procesador1.cronometro);
			procesador1.CalcularRendimiento();
			$("#rendimientoCPU1").text(procesador1.rendimientoCPU+"%");
		},1000);
	});

	$("#ejecutar2").click(function(){
		$("#ejecutar2").attr("disabled",true);
		$("#interrumpir2").attr("disabled",false);
		hilo2 = setInterval(function(){
			procesador2.CorrerProcesador(recursos);
			$("#listos2").html(dibujarCola(procesador2.listos));
			$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
			$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
			$("#terminados2").html(dibujarCola(procesador2.terminados));
			$("#cpu2").html(dibujarCola(procesador2.CPU));
			$("#cronometro2").text(procesador2.cronometro);
			procesador2.CalcularRendimiento();
			$("#rendimientoCPU2").text(procesador2.rendimientoCPU+"%");
		},1000);
	});

	$("#ejecutar3").click(function(){
		$("#ejecutar3").attr("disabled",true);
		$("#interrumpir3").attr("disabled",false);
		hilo3 = setInterval(function(){
			procesador3.CorrerProcesador(recursos);
			$("#listos3").html(dibujarCola(procesador3.listos));
			$("#suspendidos3").html(dibujarCola(procesador3.suspendidos));
			$("#bloqueados3").html(dibujarCola(procesador3.bloqueados));
			$("#terminados3").html(dibujarCola(procesador3.terminados));
			$("#cpu3").html(dibujarCola(procesador3.CPU));
			$("#cronometro3").text(procesador3.cronometro);
			procesador3.CalcularRendimiento();
			$("#rendimientoCPU3").text(procesador3.rendimientoCPU+"%");
		},1000);
	});
	
	/* botones interrumpir procesador */
	$("#interrumpir1").click(function(){
		$("#interrumpir1").attr("disabled",true);
		$("#ejecutar1").attr("disabled",false);
		procesador1.DetenerProcesador(recursos);
		clearInterval(hilo1);
		$("#listos1").html(dibujarCola(procesador1.listos));
		$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
		$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
		$("#terminados1").html(dibujarCola(procesador1.terminados));
		$("#cpu1").html(dibujarCola(procesador1.CPU));
	});

	$("#interrumpir2").click(function(){
		$("#interrumpir2").attr("disabled",true);
		$("#ejecutar2").attr("disabled",false);
		procesador2.DetenerProcesador(recursos);
		clearInterval(hilo2);
		$("#listos2").html(dibujarCola(procesador2.listos));
		$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
		$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
		$("#terminados2").html(dibujarCola(procesador2.terminados));
		$("#cpu2").html(dibujarCola(procesador2.CPU));
	});

	$("#interrumpir3").click(function(){
		$("#interrumpir3").attr("disabled",true);
		$("#ejecutar3").attr("disabled",false);
		procesador3.DetenerProcesador(recursos);
		clearInterval(hilo3);
		$("#listos3").html(dibujarCola(procesador3.listos));
		$("#suspendidos3").html(dibujarCola(procesador3.suspendidos));
		$("#bloqueados3").html(dibujarCola(procesador3.bloqueados));
		$("#terminados3").html(dibujarCola(procesador3.terminados));
		$("#cpu3").html(dibujarCola(procesador3.CPU));
	});


	/* botones diagrmas de gantt*/
	$("#gantt1").click(function(){
		$("#dGantt1").html("");
		pintarGantt(procesador1.estados,"#dGantt1");
	});
	/* botones diagrmas de gantt*/
	$("#gantt2").click(function(){
		$("#dGantt2").html("");
		pintarGantt(procesador2.estados,"#dGantt2");
	});
	/* botones diagrmas de gantt*/
	$("#gantt3").click(function(){
		$("#dGantt3").html("");
		pintarGantt(procesador3.estados,"#dGantt3");
	});


	/* botones calcular rendimiento */
	$("#rendimiento1").click(function(){
		procesador1.CalcularRendimiento();
		$("#vrendimiento1").html(dibujarRendiminetos(procesador1.rendimientoProcesos));
		
	});

	$("#rendimiento2").click(function(){
		procesador2.CalcularRendimiento();
		$("#vrendimiento2").html(dibujarRendiminetos(procesador2.rendimientoProcesos));
		
	});

	$("#rendimiento3").click(function(){
		procesador3.CalcularRendimiento();
		$("#vrendimiento3").html(dibujarRendiminetos(procesador3.rendimientoProcesos));
		
	});

});

/*-----------------------------------------*/

/* funciones de apoyo */

/* funcion para dar valores por defecto a los campos de los formularios */
function preestablecer(){
	$("#nombre1").val("P"+p1);
	$("#nombre2").val("P"+p2); 
	$("#nombre3").val("P"+p3); 
	$("#tiempo1, #tiempo2, #tiempo3").val(10);
}

function dibujarCola(cola){
	var colaAux = new Cola();
	var textoCola = "";
	var procesoAux;
	while(!cola.Listavacia()){
		procesoAux = cola.Listaatender();
		textoCola += dibujarProceso(procesoAux);
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		cola.Listainsertar(procesoAux);
	}
	return textoCola;
}

function dibujarProceso(proceso){
	var procesoAux ="<tr>";
	procesoAux += "<td>"+proceso.nombre+"</td>";
	procesoAux += "<td>"+"T:"+proceso.tiempo+"</td>";
	procesoAux += "<td>"+"Q:"+proceso.qRestante+"</td>";
	procesoAux += "<td>"+proceso.recurso+"</td>";
	procesoAux += "</tr>";
	return procesoAux;
}


function dibujarRendiminetos(procesos){
	var texto ="<tr><td>Nombre</td><td>Tiempo P</td><td>Tiempo Respuesta</td><td>Tiempo Espera</td><td>Penalización</td><td>Proporción Respuesta</td></tr>";
	for(var i = 0; i < procesos.length; i++){
		texto +="<tr><td>P"+i+"</td>";
		for(var j = 0; j < 5; j++){
			texto += "<td>"+procesos[i][j]+"</td>";
		}
		texto +="</tr>";
	}
	return texto;
}


/*var cola1 = new Cola();
var proceso1 = new Proceso(1, "p1", 5, "Impresora");
var proceso2 = new Proceso(2, "p2", 5, "Teclado");
var proceso3 = new Proceso(3, "p3", 5, "Mouse");
var proceso4 = new Proceso(4, "p1", 5, "Impresora");
var proceso5 = new Proceso(5, "p2", 5, "Teclado");
var proceso6 = new Proceso(6, "p3", 5, "Mouse");




procesador1.CrearProceso(proceso1);
procesador1.CrearProceso(proceso2);
procesador1.CrearProceso(proceso3);

procesador2.CrearProceso(proceso4);
procesador2.CrearProceso(proceso5);
procesador2.CrearProceso(proceso6);

var hilo1 = setInterval(
	function(){
		console.log("procesador1");
		console.log("impresora ",recursos[0].estado);
		procesador1.CorrerProcesador(recursos);
	}, 
	1000);
var hilo2 = setInterval(
	function(){
		console.log("procesador2");
		console.log("impresora ",recursos[0].estado);
		procesador2.CorrerProcesador(recursos);
	}
	,1000);*/


/*var segundo = 0;
for(var i = 0; i < 20; i++){
	console.log("segundo ", segundo);
	procesador1.CorrerProcesador(recursos);	
	segundo++;
}
*/

/*
var process;

cola1.Listainsertar(proceso1)
cola1.Listaimprimir();

cola1.Listainsertar(proceso3)
cola1.Listaimprimir();

cola1.Listainsertar(proceso2)
cola1.Listaimprimir();

process = cola1.Listaatender()
console.log(process.nombre)
cola1.Listaimprimir();

process = cola1.Listaatender()
console.log(process.nombre)
cola1.Listaimprimir();

process = cola1.Listaatender()
console.log(process.nombre)
cola1.Listaimprimir();

*/