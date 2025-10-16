import { Injectable } from '@angular/core';
import { ResponseBaseApiModel } from '@model/response-base-api.model';
import { SettingModel } from '@model/setting.model';
import { ApiService } from '@service/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private _apiUrl = 'setting';
  constructor(private apiService: ApiService) {}

  getSetting() {
    return this.apiService.get<
      ResponseBaseApiModel.ApiResponse<SettingModel.SettingObject>
    >({
      route: this._apiUrl,
    });
  }

  bulkUpdateSetting(data: Partial<SettingModel.Setting>) {
    return this.apiService.patch<
      ResponseBaseApiModel.ApiResponse<SettingModel.Setting>,
      Partial<SettingModel.Setting>
    >({
      route: `${this._apiUrl}/bulk_update`,
      body: data,
      id: '',
    });
  }
}
