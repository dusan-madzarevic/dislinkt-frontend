// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  postUrl1: 'http://localhost:8000',
  profileUrl: 'http://localhost:8001',
  apiReg: 'register',
  apiPost: 'post',
  apiImage: 'images',
  apiComment: 'comments',
  apiFollow: 'follow',
  apiAuth: 'auth',
  apiReaction: 'reaction',
  apiLogin: 'token',
  apiUser: 'users/me',
  apiProfil: 'profile',
  apiProfiles: 'profiles',
  apiUsers: 'users',
};

// export const environment = {
//   production: false,
//   baseUrl: 'http://localhost:8000',
//   apiPost: 'posts',
//   apiImage: 'images',
//   apiComment: 'comments',
//   // apiReg: 'register',
//   // apiLogin: 'token',
//   // apiUser: 'users/me'
// };

// export const environment1 = {
//   production: false,
//   baseUrl: 'http://localhost:8001',
//   apiReg: 'register',
//   apiLogin: 'token',
//   apiUser: 'users/me',
//   apiProfil: 'profile',
//   apiUsers: 'users',
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
