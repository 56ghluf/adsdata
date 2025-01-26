import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "adsdata-17f84", appId: "1:573712589308:web:22859226831fcc2dde1279", storageBucket: "adsdata-17f84.firebasestorage.app", apiKey: "AIzaSyDL2Z0nycJ6EgmpK5dygdO7TwJj2FAyYpI", authDomain: "adsdata-17f84.firebaseapp.com", messagingSenderId: "573712589308" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
