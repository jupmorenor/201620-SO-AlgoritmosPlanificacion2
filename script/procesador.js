/* clase Procesador */

function Procesador(quantum){
	this.cronometro = -1;
	this.CPU = new Cola();
	this.listos = new Cola();
	this.suspendidos = new Cola();
	this.bloqueados = new Cola();
	this.terminados = new Cola();
	this.estados=[];
	this.quantum = quantum;
	this.rendimientoProcesos = [];
	this.rendimientoCPU = 0;

	this.CrearProceso = crearProceso;
	this.CorrerProcesador = correrProcesador;
	this.DetenerProcesador = detenerProcesador;
	this.GuardarEstadosProcesos = guardarEstadosProcesos;
	this.CalcularRendimiento = calcularrendimiento;
	this.BuscarEnTerminados = buscarEnTerminados;
	this.CalcularQuantum = calcularQuantum;

}

function crearProceso(proceso){
	proceso.q = this.quantum;
	proceso.qRestante = this.quantum;/////// recalcular quenatum ------------------------------------------------------------------
	this.listos.Listainsertar(proceso);
	this.CalcularQuantum();
	this.estados[proceso.id] = [];
}

/* algoritmo Round Robin */
function correrProcesador(recursos){
	this.cronometro++;
	/* si hay algo en la cola de suspendidos (revisa todos los procesos, y decide si enviarlos a listos o si continuan en suspendidos) */
	if(!this.suspendidos.Listavacia()){
		var colaAux = new Cola();
		var procesoAux;
		while(!this.suspendidos.Listavacia()){
			procesoAux = this.suspendidos.Listaatender();
			procesoAux.qRestante--;
			if(procesoAux.qRestante == 0){ // si no le queda tiempo de espera en la cola de suspendidos
				this.listos.Listainsertar(procesoAux);
				this.CalcularQuantum(); /////// recalcular quenatum --------------------------------------------------------------------
			}
			else{ // si tiene que esperar aún en la cola de suspendidos
				colaAux.Listainsertar(procesoAux);
			}
		}
		while(!colaAux.Listavacia()){
			procesoAux = colaAux.Listaatender();
			this.suspendidos.Listainsertar(procesoAux);
		}
	}

	/* si hay algo en la cola de bloqueados (revisa todos los procesos, y decide si enviarlos a listos o si continuan en bloqueados) */
	if(!this.bloqueados.Listavacia()){
		var colaAux = new Cola();
		var procesoAux;
		while(!this.bloqueados.Listavacia()){
			procesoAux = this.bloqueados.Listaatender();


			/*------------------------------------------------------------------------
*/
			// revisar recursos
			for(var i in recursos){
				if(recursos[i].nombre == procesoAux.recurso){
					// si el recurso esta disponible 
					if(recursos[i].estado == 1){
						this.listos.Listainsertar(procesoAux);
						this.CalcularQuantum(); /////// recalcular quenatum ------------------------------------------------------------------
					}// si el recurso no esta disponible
					else{
						colaAux.Listainsertar(procesoAux);
					}
					break;
				}
			}	



			/*
			procesoAux.qRestante--;
			if(procesoAux.qRestante == 0){ // si no le queda tiempo de espera en la cola de bloqueados
				procesoAux.qRestante = this.quantum;  /////// recalcular quenatum ------------------------------------------------------------------
				this.listos.Listainsertar(procesoAux);
			}
			else{ // si tiene que esperar aún en la cola de bloqueados
				colaAux.Listainsertar(procesoAux);
			}
			*/
		}
		while(!colaAux.Listavacia()){
			procesoAux = colaAux.Listaatender();
			this.bloqueados.Listainsertar(procesoAux);
		}
	}

	/* si hay algo en ejecucion en CPU */
	if(!this.CPU.Listavacia()){
		var procesoAux = this.CPU.Listaatender();
		procesoAux.tiempo --;
		procesoAux.qRestante --;
		/* si no le queda tiempo de ejecución al proceso va a la cola de terminados*/
		if(procesoAux.tiempo == 0){
			/* buscar el recurso y liberarlo */
			for(var i in recursos){
				if(recursos[i].nombre == procesoAux.recurso){
					recursos[i].estado = 1;
					break;
				}
			}
			this.terminados.Listainsertar(procesoAux);
		}
		else{ 
			/* si no le queda tiempo de quantum al proceso ( va para la cola de suspendido )*/
			if(procesoAux.qRestante == 0){
				/* buscar el recurso y liberarlo */
				for(var i in recursos){
					if(recursos[i].nombre == procesoAux.recurso){
						recursos[i].estado = 1;
						break;
					}
				}
				procesoAux.qRestante = 2; //  ojojojojojojojojojojo este tiempo es el que va a durar en espera en suspendido
				this.suspendidos.Listainsertar(procesoAux);
			}
			/* si el proceso debe continuar en ejecucion regresa a la cola de CPU */
			else{
				this.CPU.Listainsertar(procesoAux);
			}
		}
	}


	/* si hay algo en la cola de listos */
	if(!this.listos.Listavacia()){
		/* mientras la CPU esta disponible y haya algo por antender en listos */
		while(this.CPU.Listavacia() && !this.listos.Listavacia()){
			var procesoAux = this.listos.Listaatender();
			/* revisar recursos */
			for(var i in recursos){
				if(recursos[i].nombre == procesoAux.recurso){
					/* si el recurso esta disponible */
					if(recursos[i].estado == 1){
						this.CPU.Listainsertar(procesoAux);
						recursos[i].estado = 0;
					}/* si el recurso no esta disponible*/
					else{
						procesoAux.qRestante = 2; //  ojojojojojojojojojojo este tiempo es el que va a durar en espera en bloqueados
						this.bloqueados.Listainsertar(procesoAux);
					}
					break;
				}
			}			
		}
	}
	this.GuardarEstadosProcesos();
}

function detenerProcesador(recursos){
	if(!this.CPU.Listavacia()){
		var procesoAux = this.CPU.Listaatender();
		procesoAux.qRestante = 2 //  ojojojojojojojojojojo este tiempo es el que va a durar en espera en suspendidos
		this.suspendidos.Listainsertar(procesoAux);
		/* buscar el recurso y liberarlo */
		for(var i in recursos){
			if(recursos[i].nombre == procesoAux.recurso){
				recursos[i].estado = 1;
				break;
			}
		}
	}
}

/* funcion para guardar el estado de cada proceso en un instante dado 
	toca recorrer cada cola */
function guardarEstadosProcesos(){
	
	var procesoAux;
	var contadorAux;
	/* cola de listos */
	var colaAux = new Cola();
	while(!this.listos.Listavacia()){//
		procesoAux = this.listos.Listaatender();//
		contadorAux = this.estados[procesoAux.id].length; 
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "L"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.listos.Listainsertar(procesoAux); //
	}

	/* cola de CPU */
	while(!this.CPU.Listavacia()){//
		procesoAux = this.CPU.Listaatender();//
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "E"];
		colaAux.Listainsertar(procesoAux);

	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.CPU.Listainsertar(procesoAux); //
	}

	/* cola de suspendidos */
	while(!this.suspendidos.Listavacia()){//
		procesoAux = this.suspendidos.Listaatender();//
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "S"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.suspendidos.Listainsertar(procesoAux); //
	}

	/* cola de bloqueados */
	while(!this.bloqueados.Listavacia()){//
		procesoAux = this.bloqueados.Listaatender();//
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "B"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.bloqueados.Listainsertar(procesoAux); //
	}

	/* cola de terminados */
	/*while(!this.terminados.Listavacia()){//
		procesoAux = this.terminados.Listaatender();//
		contadorAux = this.estados[procesoAux.id].length;
		this.estados[procesoAux.id][contadorAux] = [this.cronometro, "T"];
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.terminados.Listainsertar(procesoAux); //
	}*/
}

function calcularrendimiento(){
	if(this.cronometro > 0){

		var tiempoProceso;
		var tiempoRespuesta;
		var tiempoEspera;
		var penalizacion;
		var respuesta; 

		for(var i = 0; i < this.estados.length; i++){
			var procesoAux = this.BuscarEnTerminados(i);
			if(procesoAux){
				tiempoProceso = procesoAux.t;
				tiempoRespuesta = this.estados[i].length;
				tiempoEspera = tiempoRespuesta - tiempoProceso;
				penalizacion = tiempoRespuesta / tiempoProceso;
				respuesta = 1 / penalizacion;
				this.rendimientoProcesos[i] = [tiempoProceso, tiempoRespuesta, tiempoEspera, penalizacion, respuesta]; 	
			}
			else{
				this.rendimientoProcesos[i] = "-----";
			}	
		}


		/* renimdiento cpu */
		var colaAux = new Cola();
		var procesoAux;
		var tiempoTotal = 0;
		for(var i = 0; i < this.estados.length; i++){
			for(var j = 0; j < this.estados[i].length; j++){
				if(this.estados[i][j][1] == "E"){
					tiempoTotal++;
				}
			}
		}

		this.rendimientoCPU = parseInt((tiempoTotal*100)/(this.cronometro+1));

	}
}

function buscarEnTerminados(id){
	var colaAux = new Cola();
	var procesoAux;
	var proceso = false
	while(!this.terminados.Listavacia()){
		procesoAux = this.terminados.Listaatender();
		if(procesoAux.id == id){
			proceso = new Proceso(procesoAux.id, procesoAux.nombre, procesoAux.t, procesoAux.recurso);
		}
		colaAux.Listainsertar(procesoAux);
	}
	while(!colaAux.Listavacia()){
		procesoAux = colaAux.Listaatender();
		this.terminados.Listainsertar(procesoAux);
	}
	return proceso;
}


/* metodo para recalcular quatum cada que sea necesario*/
function calcularQuantum(){
	if(!this.listos.Listavacia()){
		var colaAux = new Cola();
		var promedio = 0;
		var numeroProcesos= 0;
		var procesoAux;
		while(!this.listos.Listavacia()){
			procesoAux = this.listos.Listaatender();
			promedio+=parseInt(procesoAux.tiempo);
			numeroProcesos++;
			colaAux.Listainsertar(procesoAux);
		}
		promedio = promedio/numeroProcesos;
		while(!colaAux.Listavacia()){
			procesoAux = colaAux.Listaatender();
			/* si solo hay un elemento en la cola de listos, el quantum es el mismo tiempo*/
			if(numeroProcesos == 1){
				procesoAux.q = procesoAux.tiempo;
				procesoAux.qRestante = procesoAux.tiempo;
			}
			else{
				procesoAux.q = parseInt(promedio*0.8);
				procesoAux.qRestante = parseInt(promedio*0.8);
			}
			if(procesoAux.q == 0){
				procesoAux.q = 1;
				procesoAux.qRestante = 1;
			
			}
			this.listos.Listainsertar(procesoAux);
		}

	}
}