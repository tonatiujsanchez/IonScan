import { Component, OnInit } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { Registro } from '../../models/registro.model';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor( public dataLocalSvc: DataLocalService ) { }

  ngOnInit() {
  }


  enviarCorreo(){
    console.log('Enviando...');
  }


  abrirRegistro( registro: Registro ){
    this.dataLocalSvc.abrirRegitro( registro );
  }
}
