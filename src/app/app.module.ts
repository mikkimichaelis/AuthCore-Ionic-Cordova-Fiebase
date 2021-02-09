import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctions, AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { AuthService, AUTH_SERVICE, BusyService, BUSY_SERVICE, FirestoreService, 
  FIRESTORE_SERVICE, ToastService, TOAST_SERVICE, UserService, USER_SERVICE } from './services';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,     // firestore
    AngularFireAuthModule,      // auth
    AngularFireStorageModule,   // storage
    AngularFireFunctionsModule  // functions
  ],
  providers: [
    AngularFireFunctions,
    TranslateService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.firebaseConfig.useEmulators ? ['localhost', 5001] : undefined },
    { provide: FIRESTORE_SERVICE, useExisting: FirestoreService},
    { provide: AUTH_SERVICE, useExisting: AuthService },
    { provide: USER_SERVICE, useExisting: UserService },
    { provide: BUSY_SERVICE, useExisting: BusyService },
    { provide: TOAST_SERVICE, useExisting: ToastService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
