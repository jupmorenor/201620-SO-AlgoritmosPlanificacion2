var procesador1 = new Procesador(5);
var procesador2 = new Procesador(5);
var procesador3 = new Procesador(5);
var p=0, p1=0, p2=0, p3=0;
var hilo1,hilo2,hilo3;


/* --------------Main--------------------- */
$(document).ready(function(){

	preestablecer();

	/* Boton para crear procesos */
	$("#crear").click(function(){
		var nombre = $("#nombre").val();
		var tiempo = $("#tiempo").val();
		var recurso = $("#recurso").val();
		var proceso = new Proceso(p, nombre, tiempo, recurso);
		switch (parseInt($("#sProcesador").val())) {
			case 1:
				procesador1.CrearProceso(proceso);
				p1++;
				$("#listos1").html(dibujarCola(procesador1.listos));
				break;
			case 2:
				procesador2.CrearProceso(proceso);
				p2++;
				$("#listos2").html(dibujarCola(procesador2.listos));
				break;
			case 3:
				procesador3.CrearProceso(proceso);
				p3++;
				$("#listos3").html(dibujarCola(procesador3.listos));
				break;
		}
		p++;
		preestablecer();
	});


	/* boton correr procesadores */
	$("#ejecutar").click(function(){
		$("#ejecutar").attr("disabled",true);
		$("#interrumpir").attr("disabled",false);
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
	$("#interrumpir").click(function(){
		$("#interrumpir").attr("disabled",true);
		$("#ejecutar").attr("disabled",false);

		procesador1.DetenerProcesador(recursos);
		clearInterval(hilo1);
		$("#listos1").html(dibujarCola(procesador1.listos));
		$("#suspendidos1").html(dibujarCola(procesador1.suspendidos));
		$("#bloqueados1").html(dibujarCola(procesador1.bloqueados));
		$("#terminados1").html(dibujarCola(procesador1.terminados));
		$("#cpu1").html(dibujarCola(procesador1.CPU));

		procesador2.DetenerProcesador(recursos);
		clearInterval(hilo2);
		$("#listos2").html(dibujarCola(procesador2.listos));
		$("#suspendidos2").html(dibujarCola(procesador2.suspendidos));
		$("#bloqueados2").html(dibujarCola(procesador2.bloqueados));
		$("#terminados2").html(dibujarCola(procesador2.terminados));
		$("#cpu2").html(dibujarCola(procesador2.CPU));

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
	$("#nombre").val("P"+p);
	$("#tiempo").val(10 + Math.floor(Math.random() * 20));
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
		texto +="<tr>"//"<td>P"+procesos[i][0]+"</td>";
		for(var j = 0; j < procesos[i].length; j++){
			texto += "<td>"+procesos[i][j]+"</td>";
		}
		texto +="</tr>";
	}
	return texto;
}
