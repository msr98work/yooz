import { UserModel } from './user.model';

export namespace AuthModel {
  export type SendEmail = Pick<UserModel.Full, 'email'>;

  export type VerifyEmailParams = Pick<UserModel.Create, 'email' | 'password'>;

  export interface Token {
    access_token: string;
  }
}
