import { Component, OnInit, ViewChild } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Registro } from '../../models/registro.model';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  @ViewChild(IonList) listaRegistros: IonList;

  constructor( public dataLocalSvc: DataLocalService ) { }

  ngOnInit() {
  }


  enviarCorreo(){
    this.dataLocalSvc.enviarCorrero();
  }


  abrirRegistro( registro: Registro ){
    this.dataLocalSvc.abrirRegitro( registro );    
  }

  eliminarRegistro(registro:Registro){
    this.dataLocalSvc.eliminarRegistro( registro );
    this.listaRegistros.closeSlidingItems();
    
  }
}
