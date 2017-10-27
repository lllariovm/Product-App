import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {SQLite} from "@ionic-native/sqlite";
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CreateProductPage } from '../pages/create-product/create-product';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { OptionsPage } from '../pages/options/options';
import {RegisterUserPage} from '../pages/register-user/register-user';
import {LoginPage} from '../pages/login/login';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import { ListPage } from '../pages/list/list';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { ProductServiceDbProvider } from '../providers/product-service-db/product-service-db';
import {EditProfilePage} from '../pages/edit-profile/edit-profile';
import { Storage } from '@ionic/storage';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { UserServiceDbProvider } from '../providers/user-service-db/user-service-db';
import { ProfileDetailPage } from '../pages/profile-detail/profile-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductDetailPage,
    CreateProductPage,
    EditProductPage,
    RegisterUserPage,
    LoginPage,
    ForgotPasswordPage,
    ProfileDetailPage,
    EditProfilePage,
    OptionsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductDetailPage,
    CreateProductPage,
    EditProductPage,
    RegisterUserPage,
    ForgotPasswordPage,
    ProfileDetailPage,
    EditProfilePage,
    LoginPage,
    OptionsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,    
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductServiceProvider,
    ProductServiceDbProvider,
    Storage,
    Geolocation,
    UserServiceProvider,
    UserServiceDbProvider
  ]
})
export class AppModule {}