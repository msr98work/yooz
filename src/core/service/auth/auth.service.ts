import { inject, Injectable } from '@angular/core';
import { AuthModel } from '@model/auth.model';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { ApiService } from '@service/api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl = 'auth';
  private _loginApiUrl = `${this._apiUrl}/login`;
  private _refreshApiUrl = `${this._apiUrl}/refresh`;
  private _captchaApiUrl = `captcha`;

  constructor(private apiService: ApiService) {}

  login(
    data: AuthModel.Login
  ): Observable<ResponseBaseApiModel.ApiResponse<AuthModel.LoginResponse>> {
    return this.apiService.post<
      ResponseBaseApiModel.ApiResponse<AuthModel.LoginResponse>,
      AuthModel.Login
    >({
      route: this._loginApiUrl,
      body: data,
    });
  }

  refreshToken(
    data: AuthModel.LoginRefresh
  ): Observable<
    ResponseBaseApiModel.ApiResponse<AuthModel.LoginRefreshResponse>
  > {
    return this.apiService.post<
      ResponseBaseApiModel.ApiResponse<AuthModel.LoginRefreshResponse>,
      AuthModel.LoginRefresh
    >({
      route: this._refreshApiUrl,
      body: data,
    });
  }

  // captcha() {
  //   return this.apiService.post<
  //     ApiResponse<LoginRefreshResponse>,
  //     LoginRefresh
  //   >({
  //     route: this._captchaApiUrl,
  //   });
  // }

  // changePassword(username: string, data: Partial<User>) {
  //   return this.apiService.put<ApiResponse<User>, Partial<User>>({
  //     route: `${this._apiUrl}/${username}/change-password`,
  //     id: undefined,
  //     body: data,
  //   });
  // }

  // resetPassword(username: string, data: Partial<User>) {
  //   return this.apiService.put<ApiResponse<User>, Partial<User>>({
  //     route: `${this._apiUrl}/${username}/reset-password`,
  //     id: undefined,
  //     body: data,
  //   });
  // }
}
