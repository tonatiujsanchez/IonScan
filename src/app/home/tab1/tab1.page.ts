import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

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

  constructor( private barcodeScanner: BarcodeScanner ) { }


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

      console.log('Barcode data cancelled:', barcodeData.cancelled );
      console.log('Barcode data format:', barcodeData.format );
      console.log('Barcode data text:', barcodeData.text );

     }).catch(err => {

         console.log('Error', err);

     });
  }

}
