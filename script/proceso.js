function Proceso(id, nombre, tiempo, recurso, prioridad){
	this.id = id;
	this.nombre = nombre;
	this.tiempo = tiempo;
	this.pos;
	this.q;
	this.qRestante;
	this.recurso = recurso;
	this.t = tiempo;
	this.prioridad = prioridad;
}
