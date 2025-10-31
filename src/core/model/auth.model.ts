import { UserModel } from './user.model';

export namespace AuthModel {
  
  export interface SignIn {
    username: string;
    password: string;
    otp?: string;
  }

  export interface SignUp
    extends Omit<UserModel.Full, 'id' | 'position' | 'full_name'> {
    confirm_password: string;
    code: string;
  }
  
  export type SendEmail = Pick<UserModel.Full, 'email'>;

  export type VerifyEmailParams = Pick<UserModel.Create, 'email' | 'password'>;

  export interface Token {
    access_token: string;
  }
}
