import { QueryParams } from '@model/query-params.model';
import { inject, Injectable } from '@angular/core';
import { RequestModel } from '@model/request.model';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { BaseApiService } from '@service/base-api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private baseApiService = inject(BaseApiService);
  private readonly _api_base = 'request';
  private readonly _api_state = this._api_base + '/state';
  private readonly _api_type = this._api_base + '/type';

  postState(body: RequestModel.StateCreate) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<RequestModel.State>,
      RequestModel.StateCreate
    >({
      route: this._api_state,
      body: body,
    });
  }

  getStateAll() {
    return this.baseApiService.get<
      ResponseBaseApiModel.ApiResponsePaginated<RequestModel.State>
    >({
      route: this._api_state,
      // params: {},
    });
  }

  postType(body: RequestModel.TypeCreate) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<RequestModel.Type>,
      RequestModel.TypeCreate
    >({
      route: this._api_type,
      body: body,
    });
  }

  getTypeAll(
    queryParam?: QueryParams & {
      is_tree: boolean;
    }
  ) {
    return this.baseApiService.get<
      ResponseBaseApiModel.ApiResponse<RequestModel.Type[]>
    >({
      route: this._api_type,
      params: queryParam,
    });
  }
}
