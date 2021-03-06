import { Platform } from '@ionic/angular';
import firebase from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';

export interface IAuthService {
    firebaseUi: firebaseui.auth.AuthUI;

    auth: firebase.auth.Auth;
    authUser: firebase.User;

    authUser$: ReplaySubject<any>;
    logout$: Subject<any>;
    
    isAuthenticated: boolean;

    signOut(): Promise<any>;
    getUiConfig(platform: Platform): any;
}
    