import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import _ from 'lodash';
import firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { Subscription, ReplaySubject, Subject } from 'rxjs';

import { IAuthService, IUserService, } from './';
import { USER_SERVICE } from './injection-tokens';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  auth: firebase.auth.Auth;
  firebaseUi: firebaseui.auth.AuthUI;
  authUser: firebase.User = null;
  authUser$: ReplaySubject<any> = new ReplaySubject<any>(1);
  logout$: Subject<any> = new Subject<any>();

  get isAuthenticated(): boolean {
    return this.authUser !== null ? true : false;
  }

  private authStateSubscription: Subscription;

  constructor(
    private firebaseAuth: AngularFireAuth,
    @Inject(USER_SERVICE) public userService: IUserService) {
    this.auth = firebase.auth();

    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch(function (error) {
        console.error(error);
      });

    this.firebaseUi = new firebaseui.auth.AuthUI(this.auth);
    this.authStateSubscribe();
  }

  async signOut(): Promise<any> {
    console.log(`signOut`);
    this.logout$.next(true);
    await this.firebaseAuth.signOut();
    this.firebaseUi.reset();
  }

  authStateSubscribe() {
    this.authStateUnsubscribe();

    this.authStateSubscription = this.firebaseAuth.authState.subscribe(
      (user: firebase.User) => {
        console.log(`firebaseAuth.authState(${user ? user.uid : 'null'})`);
        this.authUser = user;
        this.authUser$.next(this.authUser);
      },
      (error: any) => {
        console.error(error);
      });
  }

  authStateUnsubscribe() {
    if (this.authStateSubscription && !this.authStateSubscription.closed) {
      this.authStateSubscription.unsubscribe();
      this.authStateSubscription = null;
    }
  }

  public getUiConfig(): any {
    const that = this;
    const config: any = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          console.log(`firebaseUi.signInSuccessWithAuthResult()`);
          console.log(`redirectUrl: ${redirectUrl}`);
          var user = authResult.user;
          var credential = authResult.credential;
          var isNewUser = authResult.additionalUserInfo.isNewUser;
          var providerId = authResult.additionalUserInfo.providerId;
          var operationType = authResult.operationType;
          that.userService.isNewUser = authResult.additionalUserInfo.isNewUser;
          console.log(`signInSuccessWithAuthResult(authResult.isNewUser): ${authResult.additionalUserInfo.isNewUser}`)
          return false;
        },
        signInFailure: async (error: firebaseui.auth.AuthUIError) => {
          console.log(`firebaseUi.signInFailure(): ${error}`);
          if (error.code !== 'firebaseui/anonymous-upgrade-merge-conflict') {
            return Promise.resolve();
          }
          var anonymousUser = firebase.auth().currentUser;
          return firebase.auth().signInWithCredential(error.credential);
          anonymousUser.delete();
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          // document.getElementById('firebaseui-auth-container').style.display = 'none';
          console.log('firebaseUi.uiShown()');
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        'apple.com',
        {
          customParameters: {
            prompt: 'select_account'
          }
        },
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      tosUrl: 'https://anonymousmeetings.us/assets/pages/tos.html',
      privacyPolicyUrl: 'https://anonymousmeetings.us/assets/pages/privacy.html',
      //signInSuccessUrl: 'home',
      autoUpgradeAnonymousUsers: true,
      signInFlow: 'redirect'
    };

    return config;
  }
}