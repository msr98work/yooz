export namespace SettingModel {
  export type Direction = 'rtl' | 'ltr';

  export interface BBox {
    lngBottomLeft: number;
    lngBottomRight: number;
    latBottomLeft: number;
    latBottomRight: number;
  }

  export interface Setting {
    title: string;
    BBox: string;
    logo: string;
  }

  export interface SettingObject {
    key: Keys;
    value: string;
  }

  export type Keys =
    | 'introduction_text'
    | 'email'
    | 'login_image'
    | 'address'
    | 'phone'
    | 'title_english'
    | 'projection'
    | 'refresh_lifetime_minutes'
    | 'access_lifetime_minutes'
    | 'app_language'
    | 'logo'
    | 'BBox'
    | 'title';
  export interface Settings {
    [key: string]: string;
  }

  export interface SettingForm {
    title: string;
    bbox: BBox;
    file: string;
  }
}
