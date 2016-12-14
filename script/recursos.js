/* Clase recurso */
function Recurso(nombre, estado){
	/* atributos de un recurso */
	this.nombre = nombre;
	this.estado = estado;
	this.turno = 0;
	this.turnoActual = 0;

	/* metodos de un recurso */
	this.OcuparRecurso = ocuparRecurso;
	this.LiberarRecurso = liberarRecurso;
}

/* estados: 0 --> ocupado
			1 --> libre
 */
function ocuparRecurso(){
	this.estado = 0;
}
function liberarRecurso(){
	this.estado = 1;
}

/* instancias de los recursos dentro de un arreglo */
recursos = new Array(6);

recurso1 = new Recurso("Impresora", 1);
recurso2 = new Recurso("Teclado", 1);
recurso3 = new Recurso("Mouse", 1);
recurso4 = new Recurso("USB", 1);
recurso5 = new Recurso("RAM", 1);
recurso6 = new Recurso("Red", 1);

recursos[0] = recurso1;
recursos[1] = recurso2;
recursos[2] = recurso3;
recursos[3] = recurso4;
recursos[4] = recurso5;
recursos[5] = recurso6;
