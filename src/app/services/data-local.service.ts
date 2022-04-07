import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Registro } from '../models/registro.model';

import { Storage } from '@ionic/storage-angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  private keyStorage: string = '01042022-ion-scan';
  private nombreCsv = 'registrosScan.csv';

  registros: Registro[] = [];

  
  constructor( 
    private storage: Storage,
    private navCtrl: NavController,
    private platform: Platform,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
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

    
    
    switch (registro.type) {
      case 'http':
        this.navCtrl.navigateForward('/tabs/tab2');
        this.abrirNavegador( registro.text )
        break;
    
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`)
        break;
    
      default:
        this.navCtrl.navigateForward('/tabs/tab2');
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

  eliminarRegistro( registro:Registro ){
    this.registros = this.registros.filter( r => r.created !== registro.created )
    this.guardarStorage();
  }

  guardarStorage(){
    this._storage.set( this.keyStorage, this.registros );
  }


  enviarCorrero(){

    const arrayTemp = [];

    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrayTemp.push(titulos);

    this.registros.forEach(( registro )=>{
      const fila = `${ registro.type }, ${ registro.format }, ${ registro.created }, ${ registro.text.replace(',', ' ') }\n`;
      arrayTemp.push( fila );
    })

    this.crearArchivoFisico( arrayTemp.join('') );

  }


  crearArchivoFisico( texto: string ){
    
    this.file.checkFile( this.file.dataDirectory, this.nombreCsv )
      .then( existeArchivo =>{
        console.log('existeArchivo?', existeArchivo);
        
        return this.actualizarArchivo( texto )
      })
      .catch( error =>{
        return this.file.createFile( this.file.dataDirectory, this.nombreCsv, false )
          .then( creado => this.actualizarArchivo( texto ) )
          .catch( errorCreated => console.log( 'No se pudo crear el archivo', errorCreated ) )
      })

  }

  actualizarArchivo( texto ){
     this.file.writeExistingFile( this.file.dataDirectory, this.nombreCsv, texto )
      .then( ()=>{
        console.log('Archivo creado exitosamente!');

        const archivo = this.file.dataDirectory + this.nombreCsv;
        console.log(this.file.dataDirectory + this.nombreCsv);

        // Eviar email
        const email = {
          to: 'ejemplo@correo.com',
          // cc: 'erika@mustermann.de', // Correro respaldo
          // bcc: ['john@doe.com', 'jane@doe.com'],
          attachments: [
            archivo
          ],
          subject: 'Respaldo de Scans',
          body: 'Este es el respaldo de tus escaneos en  <strong>IonScan</strong>',
          isHtml: true
        };
        
        // Send a text message using default options
        this.emailComposer.open(email);

      })
      .catch( error => console.log('Ups! hubo un error inesperado an tratar de crear el archivo', error) );
  }

}
