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
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { APIAuthInterceptor } from '@interceptor/api-auth-interceptor.service';
import {
  provideTranslateHttpLoader,
  TranslateHttpLoader,
} from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';

// const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
//   http: HttpClient
// ) => new TranslateHttpLoader(http, './i18n/');

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAppInitializer(() => {
    //   const settingsService = inject(SettingsService);
    //   return settingsService.initialize();
    // }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'fa',
      lang: 'fa',
    }),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([APIAuthInterceptor])),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
  ],
};
