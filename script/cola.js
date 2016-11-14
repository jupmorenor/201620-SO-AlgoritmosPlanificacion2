 /* Clase Cola */
 function Cola() {
	
	/* Atributos */	
	this.nodoRaiz = null;
	this.nodoFondo = null;
	this.tam = 0;

	/* Metodos */
	this.Listavacia = vacia;
	this.Listainsertar = insertar;
	this.Listaatender = atender;
	this.Listaimprimir = imprimir;
	this.ListagetRaiz = getRaiz;
	this.ListagetTam = getTam;
	
 }
 
function vacia(){
	if(this.nodoRaiz == null){
		
		return true;
	}
	else{
		return false;
	}
 }
 
 //Método insertar
 function insertar(proceso){
	var nuevo = new Nodo();
	
	nuevo.proceso = proceso;
	nuevo.sig = null;

	if(this.nodoRaiz == null){
		this.nodoRaiz = nuevo;
		this.nodoFondo = nuevo;
	}
	else{
		this.nodoFondo.sig = nuevo;
		this.nodoFondo = nuevo;
	}
	
	this.tam++;
 }
 
  //Método atender
 function atender(){
	 
	if (!this.Listavacia()){
		
		var aux = this.nodoRaiz;
		if(this.nodoRaiz == this.nodoFondo){
			
			this.nodoRaiz = null;
			this.nodoFondo = null;
			
		}
		else{
			this.nodoRaiz = this.nodoRaiz.sig;
		}
		return aux.proceso;
	} 
	else{
		return 0;
	}
	
 }
  
   //Método imprimir
 function imprimir(){
	var aux = new Nodo();
	var procesoAux = new Proceso();
	aux = this.nodoRaiz;
	while(aux!= null){
		procesoAux = aux.proceso;
		console.log(procesoAux.id);
		aux=aux.sig;
	}
	console.log("__________");
 }
 
 function getRaiz(){
	var aux = new Nodo();
	aux = this.nodoRaiz;
	return aux;
 }
 
 function getTam(){
	return this.tam;
 }
 
