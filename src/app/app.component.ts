import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
  arrProductos:any=[];
  arrProductos2:any=[];

  opcionSeleccionado:string='suma';
  descripcionProducto:string='';
  valorProducto:number=100;
  sumaProductos:number=0;
  restaProductos:number=0;

  egresos:number=0;
  ingresos:number=0;

  constructor(){
    this.arrProductos=JSON.parse(localStorage.getItem('ingresos') || '[]');
    this.arrProductos2=JSON.parse(localStorage.getItem('egresos') || '[]');
    this.egresos=JSON.parse(localStorage.getItem('egresosT') || '0');
    this.ingresos=JSON.parse(localStorage.getItem('ingresosT') || '0');

    this.sumaProductos=JSON.parse(localStorage.getItem('sumaTotal') || '0');

    
    
  }

  obtenerValor():void{
    if(this.opcionSeleccionado=='suma'){
      
      this.AgregarDatos();
    }else{
      this.agregarEgresos();
      
    }
  
    
  }

  AgregarDatos(){

    this.descripcionProducto=this.descripcionProducto.trim();
    if (this.descripcionProducto=="" || !this.valorProducto) {
      
      console.log('error');

      return;
      
    }

    let objPresupuesto={
      descripcion:'',
      valor:0,
    }

    objPresupuesto.descripcion=this.descripcionProducto;
    objPresupuesto.valor=this.valorProducto;

    this.arrProductos.push(objPresupuesto);

    /* console.log(this.arrProductos); */

    this.ingresos+=this.valorProducto;

    this.sumaProductos+=this.valorProducto;;

    

    localStorage.setItem('ingresos',JSON.stringify(this.arrProductos));
    localStorage.setItem('ingresosT',JSON.stringify(this.ingresos));
    localStorage.setItem('sumaTotal',JSON.stringify(this.sumaProductos));
    
    /* limpiar */
    this.descripcionProducto='';
    this.valorProducto=0;

  }


  eliminarProductos(i:number){
   

    
    this.ingresos-=this.arrProductos[i].valor;
    this.sumaProductos=this.ingresos;
    
   this.arrProductos.splice(i,1);
   localStorage.setItem('ingresos',JSON.stringify(this.arrProductos));
   localStorage.setItem('ingresosT',JSON.stringify(this.ingresos));
   localStorage.setItem('sumaTotal',JSON.stringify(this.sumaProductos));
  }

  agregarEgresos(){
    let objPresupuesto={
      descripcion:'',
      valor:0,
    }

    objPresupuesto.descripcion=this.descripcionProducto;
    objPresupuesto.valor=this.valorProducto;

    this.arrProductos2.push(objPresupuesto);

    this.egresos+=this.valorProducto;

    this.sumaProductos-=this.valorProducto;
    
    
  

    /* limpiar */
    this.descripcionProducto='';
    this.valorProducto=0;

    localStorage.setItem('egresos',JSON.stringify(this.arrProductos2));
    localStorage.setItem('sumaTotal',JSON.stringify(this.sumaProductos));
    localStorage.setItem('egresosT',JSON.stringify(this.egresos));



    
  }

  eliminarProductosE(i:number){

    this.sumaProductos+=this.arrProductos2[i].valor;
      this.egresos-=this.arrProductos2[i].valor;
   this.arrProductos2.splice(i,1);
   localStorage.setItem('egresos',JSON.stringify(this.arrProductos2));
   localStorage.setItem('egresosT',JSON.stringify(this.egresos));
  }





}
