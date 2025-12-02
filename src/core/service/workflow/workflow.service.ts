import { inject, Injectable } from '@angular/core';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { WorkflowModel } from '@model/workflow.model';
import { BaseApiService } from '@service/base-api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  private baseApiService = inject(BaseApiService);
  private readonly _api_base = 'workflow';

  post(body: WorkflowModel.Create) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<WorkflowModel.Full>,
      WorkflowModel.Create
    >({
      route: this._api_base,
      body: body,
    });
  }

  getAll() {
    return this.baseApiService.get<
      ResponseBaseApiModel.ApiResponsePaginated<WorkflowModel.Full>
    >({
      route: this._api_base,
    });
  }
}
