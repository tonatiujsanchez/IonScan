import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Plugins
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }


/*
NOTAS:

ejecutar el sig comando para utilizar Native APIs

1- Probar primero
npm i --save @awesome-cordova-plugins/core


npm install @ionic-native/core

*/ 