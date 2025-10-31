import { inject, Injectable, signal } from '@angular/core';
import { AuthModel } from '@model/auth.model';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { UserModel } from '@model/user.model';
import { BaseApiService } from '@service/base-api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiService = inject(BaseApiService);
  private readonly _api_base = 'user';

  me = signal<UserModel.Full>(null);

  post(body: AuthModel.SignUp) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<UserModel.Create>,
      AuthModel.SignUp
    >({
      route: this._api_base,
      body: body,
    });
  }

  getMeInfo() {
    return this.baseApiService.get<
      ResponseBaseApiModel.ApiResponse<UserModel.Full>
    >({
      route: this._api_base + `/me`,
    });
  }
}
