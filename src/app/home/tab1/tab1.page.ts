import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  slidesOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor( 
      private barcodeScanner: BarcodeScanner,
      private dataLocalSvc: DataLocalService
      ) { }


  // 1. Entrando por primera vez
  ngOnInit() {
    // console.log('Entrando por primera vez ...ngOninit');
  }
  
  // 2. La pagin va a cargar
  ionViewWillEnter(){
    // console.log('La pagin va a cargar... ionViewDidLeave');
    this.openScan();
  }
  // 3. Entrando...
  ionViewDidEnter() {
    // console.log('Entrando... ionViewDidEnter');
  }
  // 4. La pagina se va a destruir...
  ionViewWillLeave(){
    // console.log('La pagina se va a destruir... ionViewWillLeave');
  }
  // 5. Saliendo...
  ionViewDidLeave(){
    // console.log('Saliendo... ionViewDidLeave');
  }


  openScan(){
    this.barcodeScanner.scan().then(barcodeData => {

      if( !barcodeData.cancelled ){
        this.dataLocalSvc.guardarRegistro( barcodeData.format, barcodeData.text )
      }
      
      
     }).catch(err => {

         console.log('Error', err);

        //  this.dataLocalSvc.guardarRegistro( 'QRCode', 'https://www.udemy.com/course/ionic-ios-android-pwa-appstore-playstore-push');     
         this.dataLocalSvc.guardarRegistro( 'QRCode', 'geo:40.73151796986687,-74.06087294062502');     

     });
  }

  

    
  // TODO: QR-CODE
  // https://www.qrcode.es/es/generador-qr-code/

}
