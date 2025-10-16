import { inject, Injectable, signal } from '@angular/core';
import { QueryParams } from '@model/query-params.model';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { UserModel } from '@model/user.model';
import { ApiService } from '@service/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiService = inject(ApiService);

  private _apiUrl = 'users';
  generalAccesses = signal<[]>;

  getList() {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponse<UserModel.User[]>
    >({
      route: this._apiUrl,
    });
  }

  getGeneralAccsess() {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponse<UserModel.User[]>
    >({
      route: this._apiUrl,
    });
  }

  getByParams(params: QueryParams) {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponsePaginated<UserModel.User>
    >({
      route: this._apiUrl,
      params,
    });
  }

  create(data: UserModel.UserData) {
    return this.apiService.post<
      ResponseBaseApiModel.ApiResponse<UserModel.User>,
      UserModel.UserData
    >({
      route: `${this._apiUrl}/register`,
      body: data,
    });
  }

  update(id: number, data: Partial<UserModel.User>) {
    return this.apiService.patch<
      ResponseBaseApiModel.ApiResponse<UserModel.User>,
      Partial<UserModel.User>
    >({
      route: this._apiUrl,
      id,
      body: data,
    });
  }

  updateStatus(id: number, data: Partial<UserModel.UserChangeStatus>) {
    return this.apiService.patch<
      ResponseBaseApiModel.ApiResponse<UserModel.User>,
      Partial<UserModel.UserChangeStatus>
    >({
      route: `${this._apiUrl}/${id}/change_activation_status`,
      id: undefined,
      body: data,
    });
  }

  delete(id: number) {
    return this.apiService.delete({
      route: this._apiUrl,
      id,
    });
  }

  toggleSuperuserAdmin(userId: number, data: { is_superuser: boolean }) {
    return this.apiService.patch<ResponseBaseApiModel.ApiResponse<any>, any>({
      route: `${this._apiUrl}/${userId}/toggle-superuser-admin`,
      id: undefined,
      body: data,
    });
  }
}
