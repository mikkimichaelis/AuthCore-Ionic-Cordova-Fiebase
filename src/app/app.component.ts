declare var navigator: any;
import { environment } from 'src/environments/environment';
import _ from 'lodash';
import firebase from 'firebase/app';

import { Component, enableProdMode, Inject, isDevMode } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AUTH_SERVICE, BUSY_SERVICE, IAuthService, IBusyService, IToastService, IUserService, TOAST_SERVICE, USER_SERVICE } from './services';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public navController: NavController,
    @Inject(TOAST_SERVICE) public toastService: IToastService,
    @Inject(BUSY_SERVICE) public busyService: IBusyService,
    @Inject(USER_SERVICE) public userService: IUserService,
    @Inject(AUTH_SERVICE) private authService: IAuthService) {
      this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async (readySource) => {

      this.authService.authUser$.subscribe(
        (authUser) => {
          this.handleAuthChangeCoreRouting(authUser)
        });

      if (this.platform.is('hybrid')) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      } else {
        // fallback to browser APIs
      }
    });
  }

  async handleAuthChangeCoreRouting(authUser: firebase.User) {
    if (!_.isEmpty(authUser) && !_.isEmpty(this.userService._user)) {
      console.log(`(authUser && _user) -> navigateRoot('/home')`);
      this.navController.navigateRoot('/home');
    } else if (!_.isEmpty(authUser)) {
      // await this.busyService.present('loading user');
      const user = {}; // await this.userService.getUser(authUser.uid);
      // await this.busyService.dismiss();
      if (user) {
        console.log(`getUser() -> navigateRoot('/home')`);
        await this.navController.navigateRoot('/home');
      } else {
        this.toastService.present(`Network Error`);
        console.log(`!user -> navigateRoot('/login')`);
        this.navController.navigateRoot('/login?signOut=true');
      }
    }
    else {
      console.log(`!authUser -> navigateRoot('/login')`);
      this.navController.navigateRoot('/login');
    }
  }
}
