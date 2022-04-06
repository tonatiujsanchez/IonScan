import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Registro } from '../models/registro.model';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  private keyStorage: string = '01042022-ion-scan';

  registros: Registro[] = [];

  
  constructor( 
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform,
    private iab: InAppBrowser
     ) {
    this.loadRegistros()
   }

  async loadRegistros() {
    const storage = await this.storage.create();
    this._storage = storage;

    return await this.cargarRegistros();
  }


  async cargarRegistros(){
    const resgitrosStorage:Registro[] = await this._storage.get(this.keyStorage);

    if( !resgitrosStorage ){
      this._storage.set( this.keyStorage, [] );
    }

    this.registros = resgitrosStorage || [];

    return this.registros;

  }




  async guardarRegistro( format: string, text: string ){

    await this.loadRegistros();

    const nuevoRegistro = new Registro( format, text );

    this.registros = [ nuevoRegistro, ...this.registros ];

    this.guardarStorage();

    this.abrirRegitro( nuevoRegistro );
    console.log(this.registros);
  }



  abrirRegitro( registro: Registro ){

    this.navCtrl.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        this.abrirNavegador( registro.text )
        break;
    
      case 'geo':
        
      this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`)

        break;
    
      default:
        break;
    }

  }

  abrirNavegador( url: string ){

    if( this.platform.is('capacitor') || this.platform.is('cordova') ){
        //En el dispositivo
        const browser = this.iab.create(url);
        browser.show();

    }else{
      // En el navegador
      console.log('Estamos en la web');
      window.open(url, '_blank');
    }

  }


  guardarStorage(){
    this._storage.set( this.keyStorage, this.registros );
  }

}
