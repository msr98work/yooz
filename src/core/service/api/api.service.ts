import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { MessagesService } from '@service/messages/messages.service';
import { parseErrorMessages } from '@util/api-error-parser.util';
import { convertParamsToString } from '@util/convert-params-to-string.util';
import { SettingUtil } from '@util/setting.util';
import { Observable, catchError, map, of } from 'rxjs';

const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  base_api = `${SettingUtil.apiUrl()}`;
  private httpClient = inject(HttpClient);
  private messagesService = inject(MessagesService);

  createRoute(route: string, ignoreSlashRoute?: boolean) {
    return route + (ignoreSlashRoute ? '' : '/');
  }

  get<ResponseType>(options: {
    route: string;
    params?: object;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = options.params
      ? `${this.createRoute(
          `${this.base_api}/${options.route}`,
          options.ignoreSlashRoute
        )}?${convertParamsToString(options.params)}`
      : `${this.createRoute(
          `${this.base_api}/${options.route}`,
          options.ignoreSlashRoute
        )}`;
    return this.httpClient
      .get<ResponseType>(url, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getFile<ResponseType>(options: {
    route: string;
    params?: object;
    ignoreSlashRoute?: boolean;
  }): Observable<Blob | ResponseBaseApiModel.Error> {
    const url = options.params
      ? `${this.createRoute(
          `${this.base_api}/${options.route}`,
          options.ignoreSlashRoute
        )}?${convertParamsToString(options.params)}`
      : `${this.createRoute(
          `${this.base_api}/${options.route}`,
          options.ignoreSlashRoute
        )}`;
    return this.httpClient
      .get<Blob>(url, {
        ...http_options,
        responseType: 'blob' as 'json',
      })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getById<ResponseType>(options: {
    route: string;
    id: string | number;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = `${this.createRoute(
      `${this.base_api}/${options.route}/${options.id}`,
      options.ignoreSlashRoute
    )}`;
    return this.httpClient
      .get<ResponseType>(url, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  post<ResponseType, EntityType>(options: {
    route: string;
    body?: EntityType;
    ignoreFinalSlash?: boolean;
  }): Observable<ResponseType> {
    const url = options.ignoreFinalSlash
      ? `${this.base_api}/${options.route}`
      : `${this.base_api}/${options.route}/`;
    return this.httpClient
      .post<ResponseType>(url, options.body ?? undefined, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  postFormdata(options: {
    route: string;
    body: FormData;
    ignoreSlashRoute?: boolean;
  }): Observable<any> {
    const url = `${this.base_api}/${options.route}/`;
    return this.httpClient
      .post<any>(url, options.body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  patch<ResponseType, EntityType>(options: {
    route: string;
    id: string | number | undefined;
    body: EntityType;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = options.id
      ? `${this.base_api}/${options.route}/${options.id}/`
      : `${this.base_api}/${options.route}/`;
    return this.httpClient
      .patch<ResponseType>(url, options.body, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  patchFormdata<ResponseType>(options: {
    route: string;
    id: string | number | undefined;
    body: FormData;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = options.id
      ? `${this.base_api}/${options.route}/${options.id}/`
      : `${this.base_api}/${options.route}/`;
    return this.httpClient
      .patch<ResponseType>(url, options.body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  put<ResponseType, EntityType>(options: {
    route: string;
    id: string | number | undefined;
    body: EntityType;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = `${this.base_api}/${options.route}/${options.id}/`;
    return this.httpClient
      .put<ResponseType>(url, options.body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  putFormData<ResponseType>(options: {
    route: string;
    id: string | number | undefined;
    body: FormData;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = options.id
      ? `${this.base_api}/${options.route}/${options.id}/`
      : `${this.base_api}/${options.route}/`;
    return this.httpClient
      .put<ResponseType>(url, options.body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  delete(options: {
    route: string;
    id: string | number;
    ignoreSlashRoute?: boolean;
  }): Observable<ResponseBaseApiModel.Error> {
    const url = `${this.base_api}/${options.route}/${options.id}/`;
    return this.httpClient
      .delete<ResponseBaseApiModel.Error>(url, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          return {
            result: null,
            messages: '',
            status: response.status,
            success: response.ok ? true : false,
          };
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status !== 401) {
      const errMessage = parseErrorMessages(error);
      //  this.message.create('error', errMessage, messageOptions);
      this.messagesService.error({
        message: errMessage,
      });
      return of({
        result: null,
        messages: errMessage,
        status: error.status,
        success: error.ok,
      });
    } else {
      if (error?.url?.includes('api/authenticate/refresh/')) {
        //  this.message.create(
        //    'error',
        //    SettingsService.translateService.instant('SessionExpired'),
        //    messageOptions
        //  );
      }
      return of({
        result: null,
        messages: 'Token expired',
        status: error.status,
        success: error.ok,
      });
    }
  }
}
