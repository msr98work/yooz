import { Injectable } from '@angular/core';
import { BaseApiService } from '@service/base-api/base-api.service';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { AuthModel } from '@model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _api_base = 'auth/';
  private readonly _api_sign_in = this._api_base + 'sign_in';
  private readonly _api_send_email = this._api_base + 'send_email';

  constructor(private baseApiService: BaseApiService) {}

  sendEmail(body: AuthModel.SendEmail) {
    return this.baseApiService.post<ResponseBaseApiModel.ApiResponse<{}>, {}>({
      route: this._api_send_email,
      body: body,
    });
  }

  signIn(body: AuthModel.VerifyEmailParams) {
    return this.baseApiService.post<
      ResponseBaseApiModel.ApiResponse<AuthModel.Token>,
      AuthModel.VerifyEmailParams
    >({
      route: this._api_sign_in,
      body: body,
    });
  }
}
