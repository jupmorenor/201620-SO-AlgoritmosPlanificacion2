function Proceso(id, nombre, tiempo, recurso, prioridad){
	this.id = id;
	this.nombre = nombre;
	this.pos;
	this.tiempo = tiempo;
	this.q;
	this.qRestante;
	this.recurso = recurso;
	this.t = tiempo;
	this.prioridad = prioridad;
}
