import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { MessageService } from '@service/message/message.service';
import { convertParamsToString } from '@core/util/convert-params-to-string.util';
import { SettingUtil } from '@util/setting.util';
import { parseErrorMessages } from '@util/api-error-parser.util';

const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private httpClient = inject(HttpClient);
  private messageService = inject(MessageService);

  base_api = `${SettingUtil.baseUrl()}`;

  get<ResponseType>(options: {
    route: string;
    params?: object;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = options.params
      ? `${this.base_api}/${options.route}?${convertParamsToString(
          options.params
        )}`
      : `${this.base_api}/${options.route}`;
    return this.httpClient
      .get<ResponseType>(url, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getById<ResponseType>(options: {
    route: string;
    id: string | number;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = `${this.base_api}/${options.route}/${options.id}/`;
    return this.httpClient
      .get<ResponseType>(url, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  post<ResponseType, EntityType>(options: {
    route: string;
    body?: EntityType;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = `${this.base_api}/${options.route}`;
    return this.httpClient
      .post<ResponseType>(url, options.body ?? undefined, http_options)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  postFormdata(options: { route: string; body: FormData }): Observable<any> {
    const url = `${this.base_api}/${options.route}/`;
    return this.httpClient
      .post<any>(url, options.body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  patch<ResponseType, EntityType>(options: {
    route: string;
    id: string | number | undefined;
    body: EntityType;
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
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = options.id
      ? `${this.base_api}/${options.route}/${options.id}/`
      : `${this.base_api}/${options.route}/`;
    return this.httpClient
      .put<ResponseType>(url, options.body)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  delete<ResponseType>(options: {
    route: string;
    id: string | number;
  }): Observable<ResponseType | ResponseBaseApiModel.Error> {
    const url = `${this.base_api}/${options.route}/${options.id}/`;
    return this.httpClient
      .delete<ResponseType>(url, {
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
            statusCode: response.status,
            success: response.ok ? true : false,
          };
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  errorHandler(
    error: HttpErrorResponse
  ): Observable<ResponseBaseApiModel.Error> {
    if (error.status !== 401) {
      const errMessage = parseErrorMessages(error);
      //  this.message.create('error', errMessage, messageOptions);
      this.messageService.error({
        message: errMessage,
      });
      return of({
        result: null,
        messages: errMessage,
        statusCode: error.status,
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
        statusCode: error.status,
        success: error.ok,
      });
    }
  }
}
