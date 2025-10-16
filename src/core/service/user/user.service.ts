import { inject, Injectable } from '@angular/core';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { UserModel } from '@model/user.model';
import { BaseApiService } from '@service/base-api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiService = inject(BaseApiService);

  private readonly _api_base = 'user';

  post(body: UserModel.Create) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<UserModel.Create>,
      UserModel.Create
    >({
      route: this._api_base,
      body: body,
    });
  }
}
