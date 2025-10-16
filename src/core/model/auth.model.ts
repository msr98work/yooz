export namespace AuthModel {
  export interface Login {
    username: string;
    password: string;
    captcha_key?: string;
    captcha_value?: string;
  }

  export type LoginForm = Pick<
    Login,
    'username' | 'password' | 'captcha_value'
  >;

  export interface LoginResponse {
    access: string;
    refresh: string;
    user_id: number;
    user_first_name: string;
    user_last_name: string;
    code?: string;
    has_valid_code?: boolean;
    message?: string;
    time?: number;
  }

  export interface LoginRefresh {
    refresh: string;
  }

  export interface LoginRefreshResponse {
    access: string;
  }

  export interface Captcha {
    captcha_key: string;
    captcha_image: string;
    image_type: string;
    image_decode: string;
  }
}
