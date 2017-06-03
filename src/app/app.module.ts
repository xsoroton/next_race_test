import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import {MomentModule} from 'angular2-moment';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RacePage } from '../pages/race/race';
import { ApiDataService } from '../providers/api-data-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RacePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiDataService
  ]
})
export class AppModule {}
