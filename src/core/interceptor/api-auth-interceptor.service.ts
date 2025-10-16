import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpHandler,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, filter, take, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth/auth.service';
import { LocalStorage } from '@db/local-storage.database';

export function APIAuthInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const isRefreshing = false;
  const refreshTokenSubject: BehaviorSubject<string> = new BehaviorSubject(
    null
  ) as BehaviorSubject<any>;

  // const authDataService = inject(AuthenticationDataService);
  const authService = inject(AuthService);
  // const settingService = inject(SettingsService);
  const router = inject(Router);

  const accessToken = LocalStorage.get('access_token');
  const refreshToken = LocalStorage.get('refresh_token');

  request = addAcceptLanguage(request);

  if (accessToken && refreshToken) {
    request = addToken(
      request,
      request.url.indexOf('/api/user/refresh/') > -1
        ? refreshToken
        : accessToken
    );
  }

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (
          request.url.indexOf('/api/user/refresh/') > -1 ||
          request.url.indexOf('/api/user/login/') > -1
        ) {
          return throwError(error);
        } else {
          return handleUnauthorizedError(
            request,
            next,
            isRefreshing,
            refreshTokenSubject,
            authService,
            // authDataService,
            // settingService,
            router
          );
        }
      } else {
        return throwError(error);
      }
    })
  ) as Observable<HttpEvent<any>>;
}

const addToken = function (request: HttpRequest<any>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleUnauthorizedError = function (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  isRefreshing: boolean,
  refreshTokenSubject: BehaviorSubject<string>,
  authService: AuthService,
  // authDataService: AuthenticationDataService,
  // settingService: SettingsService,
  router: Router
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next('');

    return refreshToken(
      isRefreshing,
      authService,
      // authDataService,
      // settingService,
      router
    ).pipe(
      switchMap((jwt: string) => {
        isRefreshing = false;
        refreshTokenSubject.next(jwt);
        return next(addToken(request, jwt));
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token != null),
      take(2),
      switchMap((jwt) => {
        return next(addToken(request, jwt));
      })
    );
  }
};

const refreshToken = function (
  isRefreshing: boolean,
  authService: AuthService,
  // authDataService: AuthenticationDataService,
  // settingService: SettingsService,
  router: Router
): Observable<string> {
  // return authService
  //   .refreshToken({ refresh: authDataService._refreshToken() })
  //   .pipe(
  //     tap(
  //       (responseResult: any) => {
  //         if (responseResult.success) {
  //           authDataService._accessToken.set(responseResult.result.access);
  //           isRefreshing = false;
  //         } else {
  //           router.navigate(['/login']);
  //           authDataService.clearData();
  //           settingService.closeModals();
  //           isRefreshing = false;
  //           throwError(responseResult.messages);
  //         }
  //       },
  //       (error) => {
  //         router.navigate(['/login']);
  //         authDataService.clearData();
  //         settingService.closeModals();
  //         isRefreshing = false;
  //       }
  //     ),
  //     map((res: any) => res.result?.access)
  //   );
  return undefined;
};

const addAcceptLanguage = function (request: HttpRequest<any>) {
  return request.clone({
    setHeaders: {
      'Accept-Language': document.documentElement.lang || 'fa',
    },
  });
};
