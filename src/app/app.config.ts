import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angularquiz-84f99',
        appId: '1:628097806306:web:33a976b3bf90c8c09a13bb',
        storageBucket: 'angularquiz-84f99.firebasestorage.app',
        apiKey: 'AIzaSyDHTeUv2IZBrvDeMLgOgMq0If8MWN6gjYA',
        authDomain: 'angularquiz-84f99.firebaseapp.com',
        messagingSenderId: '628097806306',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideHttpClient()
  ],
};
