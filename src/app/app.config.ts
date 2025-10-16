import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APIAuthInterceptor } from '@interceptor/api-auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAppInitializer(() => {
    //   const settingsService = inject(SettingsService);
    //   return settingsService.initialize();
    // }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([APIAuthInterceptor])),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
  ],
};
