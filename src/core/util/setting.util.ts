import { environment } from '@environment/environment';

export namespace SettingUtil {
  export function baseUrl() {
    return window.location.protocol + '//' + environment.base_url;
  }

  export function apiUrl() {
    return baseUrl() + '/api';
  }
}
