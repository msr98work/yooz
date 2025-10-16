import { inject, Injectable } from '@angular/core';
import { RequestModel } from '@model/request.model';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { ApiService } from '@service/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiService = inject(ApiService);
  private _apiUrl = 'request';

  getList() {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponse<RequestModel.Full[]>
    >({
      route: `${this._apiUrl}/process`,
    });
  }

  getByParams(params) {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponsePaginated<RequestModel.Full>
    >({
      route: `${this._apiUrl}/process`,
      params,
    });
  }

  getById(id: number) {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponsePaginated<RequestModel.Full>
    >({
      route: `${this._apiUrl}/process/${id}`,
    });
  }

  getProcessByTrackingCode(code: number) {
    return this.apiService.get<ResponseBaseApiModel.ApiResponse<any[]>>({
      route: `${this._apiUrl}/requests/${code}/tracking`,
    });
  }

  getTargetById(id: number) {
    return this.apiService.get<ResponseBaseApiModel.ApiResponse<any>>({
      route: `${this._apiUrl}/${id}/target`,
    });
  }

  getRenewalListById(params) {
    return this.apiService.get<ResponseBaseApiModel.ApiResponse<any>>({
      route: `${this._apiUrl}/renewal`,
      params: params,
    });
  }

  getProcessTargetById(id: number, body) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/process/${id}/target`,
      body: body,
    });
  }

  addRequest(params) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/${params.id}/add-request`,
      body: params.body,
    });
  }

  addTranscriptRequest(params) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/process/${params.id}/transcript-request`,
      body: params.body,
    });
  }

  addRenewalRequest(params) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/process/${params.id}/renewal-request`,
      body: params.body,
    });
  }

  submitRequest(params) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/process/${params.id}/submit-request`,
      body: params.body,
    });
  }

  submitTranscriptRequest(params) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/transcript/${params.id}/transcript-response`,
      body: params.body,
    });
  }

  getTranscriptList() {
    return this.apiService.get<ResponseBaseApiModel.ApiResponse<any[]>>({
      route: `${this._apiUrl}/transcript`,
    });
  }

  changeRenewalRequest(id: number, body) {
    return this.apiService.post<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/renewal/${id}/renewal-submit`,
      body: body,
    });
  }
}
