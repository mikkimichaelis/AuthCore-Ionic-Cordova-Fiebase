// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyBl1MVP3bafzCnWG8RBZNmjLhyveracvsA",
    authDomain: "authcoreioniccordovafirebase.firebaseapp.com",
    projectId: "authcoreioniccordovafirebase",
    storageBucket: "authcoreioniccordovafirebase.appspot.com",
    messagingSenderId: "80323442868",
    appId: "1:80323442868:web:53c7115c16873ff91f7fe1",
    databaseURL: "https://anonymousmeetings.firebaseio.com",
    useEmulators: false
  },
  networkRetryCount: 10,
  networkRetryDelay: 500,
  busyTimeoutDuration: 10000,
  toastTimeoutDuration: 2000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
