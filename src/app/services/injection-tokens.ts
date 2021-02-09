import { InjectionToken } from '@angular/core';

export const FIRESTORE_SERVICE = new InjectionToken<string>('FirestoreService');
export const TRANSLATE_SERVICE = new InjectionToken<string>('TranslateService');

export const AUTH_SERVICE = new InjectionToken<string>('AuthService');
export const USER_SERVICE = new InjectionToken<string>('UserService');

export const BUSY_SERVICE = new InjectionToken<string>('BusyService');
export const TOAST_SERVICE = new InjectionToken<string>('ToastService');
