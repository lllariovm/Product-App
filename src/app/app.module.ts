import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { Dialogs } from '@ionic-native/dialogs';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DbServiceProvider } from '../providers/db-service/db-service';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { UserServiceProvider } from '../providers/user-service/user-service';

import {ProductDetailPage} from "../pages/product-detail/product-detail";
import {CerrarSesionPage} from "../pages/cerrar-sesion/cerrar-sesion";
import {SQLite} from "@ionic-native/sqlite";

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    CerrarSesionPage, 
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    CerrarSesionPage, 
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DbServiceProvider,
    ProductServiceProvider,
    UserServiceProvider
  ]
})
export class AppModule {}
