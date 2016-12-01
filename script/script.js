var procesador1 = new Procesador(5);
var procesador2 = new Procesador(5);
var procesador3 = new Procesador(5);
var p=0; p1=0, p2=0, p3= 0; // variables para llevar la cuenta de los procesos por cada procesador
var hilo1,hilo2,hilo3;
var velEjecucion = 0;


/* --------------Main--------------------- */
$(document).ready(function(){

	preestablecer();

	/* Botones para crear procesos */
	$("#crear").click(function(){
		var nombre = $("#nombre").val();
		var tiempo = $("#tiempo").val();
		var recurso = $("#recurso").val();
		var prioridad = $("#prioridad").val();
		var proceso = new Proceso(p,nombre, tiempo, recurso, prioridad);
		switch (parseInt($("#sProcesador").val())) {
			case 1:
				proceso.pos = p1;
				procesador1.CrearProceso(proceso);
				$("#listosRR1").html(dibujarCola(procesador1.listosRR));
				$("#listosSRTF1").html(dibujarCola(procesador1.listosSRTF));
				$("#listosSJF1").html(dibujarCola(procesador1.listosSJF));
				p1++;
				break;
			case 2:
				proceso.pos = p2;
				procesador2.CrearProceso(proceso);
				$("#listosRR2").html(dibujarCola(procesador2.listosRR));
				$("#listosSRTF2").html(dibujarCola(procesador2.listosSRTF));
				$("#listosSJF2").html(dibujarCola(procesador2.listosSJF));
				p2++;
				break;
			case 3:
				proceso.pos = p3;
				procesador3.CrearProceso(proceso);
				$("#listosRR3").html(dibujarCola(procesador3.listosRR));
				$("#listosSRTF3").html(dibujarCola(procesador3.listosSRTF));
				$("#listosSJF3").html(dibujarCola(procesador3.listosSJF));
				p3++;
				break;
		}
		p++;
		preestablecer();
	});

	/* pausar la ejecucion de la simulacion */
	$("#pausar").click(function() {
		$("#pausar").attr("disabled",true);
		$("#ejecutar").attr("disabled",false);
		clearInterval(hilo1);
		clearInterval(hilo2);
		clearInterval(hilo3);
	});

	/* modificar en tiempo de ejecucion la velocidad de ejecucion */
	$("#velocidad").change(function(){
		velEjecucion = 1000 / parseFloat($("#velocidad").val());
	});

	/* botones correr procesadores */
	$("#ejecutar").click(function(){
		$("#ejecutar").attr("disabled",true);
		$("#interrumpir").attr("disabled",false);
		$("#pausar").attr("disabled",false);
		velEjecucion = 1000 / parseFloat($("#velocidad").val());
		hilo1 = setInterval(function(){
			procesador1.CorrerProcesador(recursos);
			$("#listosRR1").html(dibujarCola(procesador1.listosRR));
			$("#listosSRTF1").html(dibujarCola(procesador1.listosSRTF));
			$("#listosSJF1").html(dibujarCola(procesador1.listosSJF));
			$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
			$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
			$("#terminados1").html(dibujarCola(procesador1.terminados));
			$("#cpu1").html(dibujarCola(procesador1.CPU));
			$("#cronometro1").text(procesador1.cronometro);
			procesador1.CalcularRendimiento();
			if (procesador1.estados.length > 0) {
				$("#dGantt1").html("");
				pintarGantt(procesador1.estados,"#dGantt1");
			}
			$("#rendimientoCPU1").text(procesador1.rendimientoCPU+"%");
		},velEjecucion);

		hilo2 = setInterval(function(){
			procesador2.CorrerProcesador(recursos);
			$("#listosRR2").html(dibujarCola(procesador2.listosRR));
			$("#listosSRTF2").html(dibujarCola(procesador2.listosSRTF));
			$("#listosSJF2").html(dibujarCola(procesador2.listosSJF));
			$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
			$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
			$("#terminados2").html(dibujarCola(procesador2.terminados));
			$("#cpu2").html(dibujarCola(procesador2.CPU));
			$("#cronometro2").text(procesador2.cronometro);
			procesador2.CalcularRendimiento();
			if (procesador2.estados.length > 0) {
				$("#dGantt2").html("");
				pintarGantt(procesador2.estados,"#dGantt2");
			}
			$("#rendimientoCPU2").text(procesador2.rendimientoCPU+"%");
		},velEjecucion);

		hilo3 = setInterval(function(){
			procesador3.CorrerProcesador(recursos);
			$("#listosRR3").html(dibujarCola(procesador3.listosRR));
			$("#listosSRTF3").html(dibujarCola(procesador3.listosSRTF));
			$("#listosSJF3").html(dibujarCola(procesador3.listosSJF));
			$("#suspendidos3").html(dibujarCola(procesador3.suspendidos));
			$("#bloqueados3").html(dibujarCola(procesador3.bloqueados));
			$("#terminados3").html(dibujarCola(procesador3.terminados));
			$("#cpu3").html(dibujarCola(procesador3.CPU));
			$("#cronometro3").text(procesador3.cronometro);
			procesador3.CalcularRendimiento();
			if (procesador3.estados.length > 0) {
				$("#dGantt3").html("");
				pintarGantt(procesador3.estados,"#dGantt3");
			}
			$("#rendimientoCPU3").text(procesador3.rendimientoCPU+"%");
		},velEjecucion);
	});

	/* botones interrumpir procesador */
	$("#interrumpir").click(function(){
		$("#interrumpir").attr("disabled",true);
		$("#ejecutar").attr("disabled",false);
		$("#pausar").attr("disabled",true);
		procesador1.DetenerProcesador(recursos);
		clearInterval(hilo1);
		$("#listosRR1").html(dibujarCola(procesador1.listosRR));
		$("#listosSRTF1").html(dibujarCola(procesador1.listosSRTF));
		$("#listosSJF1").html(dibujarCola(procesador1.listosSJF));
		$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
		$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
		$("#terminados1").html(dibujarCola(procesador1.terminados));
		$("#cpu1").html(dibujarCola(procesador1.CPU));
		if (procesador1.estados.length > 0) {
			$("#dGantt1").html("");
			pintarGantt(procesador1.estados,"#dGantt1");
		}

		procesador2.DetenerProcesador(recursos);
		clearInterval(hilo2);
		$("#listosRR2").html(dibujarCola(procesador2.listosRR));
		$("#listosSRTF2").html(dibujarCola(procesador2.listosSRTF));
		$("#listosSJF2").html(dibujarCola(procesador2.listosSJF));
		$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
		$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
		$("#terminados2").html(dibujarCola(procesador2.terminados));
		$("#cpu2").html(dibujarCola(procesador2.CPU));
		if (procesador2.estados.length > 0) {
			$("#dGantt2").html("");
			pintarGantt(procesador2.estados,"#dGantt2");
		}

		procesador3.DetenerProcesador(recursos);
		clearInterval(hilo3);
		$("#listosRR3").html(dibujarCola(procesador3.listosRR));
		$("#listosSRTF3").html(dibujarCola(procesador3.listosSRTF));
		$("#listosSJF3").html(dibujarCola(procesador3.listosSJF));
		$("#suspendidos3").html(dibujarCola(procesador3.suspendidos));
		$("#bloqueados3").html(dibujarCola(procesador3.bloqueados));
		$("#terminados3").html(dibujarCola(procesador3.terminados));
		$("#cpu3").html(dibujarCola(procesador3.CPU));
		$("#dGantt3").html("");
		if (procesador3.estados.length > 0) {
			$("#dGantt2").html("");
			pintarGantt(procesador3.estados,"#dGantt3");
		}
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
	$("#nombre").val("P"+p);
	$("#tiempo").val(5 + Math.floor(Math.random() * 20));
	$("#prioridad").val(Math.floor(Math.random() * 3) + 1);
	$("#sProcesador").val(Math.floor(Math.random() * 3) + 1);
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
	procesoAux += "<td>"+"Pr:"+proceso.prioridad+"</td>";
	procesoAux += "<td>"+"T:"+proceso.tiempo+"</td>";
	if (proceso.prioridad == 1) {
		procesoAux += "<td>"+"Q:"+proceso.qRestante+"</td>";
	}
	procesoAux += "<td>"+proceso.recurso+"</td>";
	procesoAux += "</tr>";
	return procesoAux;
}


function dibujarRendiminetos(procesos){
	var texto ="<tr><td>Nombre</td><td>Tiempo P</td><td>Tiempo Respuesta</td><td>Tiempo Espera</td><td>Penalización</td><td>Proporción Respuesta</td></tr>";
	for(var i = 0; i < procesos.length; i++){
		texto +="<tr>";//<td>P"+i+"</td>";
		for(var j = 0; j < procesos[i].length; j++){
			texto += "<td>"+procesos[i][j]+"</td>";
		}
		texto +="</tr>";
	}
	return texto;
}
