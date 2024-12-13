import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ParticipantsStore } from './store/participants.store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import {
  ChevronLeft,
  Home,
  LucideAngularModule,
  Search,
  Settings,
  SquareX,
  UserRoundPlus,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ParticipantsStore,
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Home,
        Search,
        ChevronLeft,
        Settings,
        UserRoundPlus,
        SquareX,
      })
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
