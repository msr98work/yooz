import { inject, Injectable } from '@angular/core';
import { FormModel } from '@model/form.model';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { BaseApiService } from '@service/base-api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private baseApiService = inject(BaseApiService);
  private readonly _api_base = 'form';

  post(body: FormModel.Create) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<FormModel.Full>,
      FormModel.Create
    >({
      route: this._api_base,
      body: body,
    });
  }

  getAll() {
    return this.baseApiService.get<
      ResponseBaseApiModel.ApiResponsePaginated<FormModel.Full>
    >({
      route: this._api_base,
    });
  }
}
