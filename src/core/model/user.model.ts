export namespace UserModel {
  export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    national_code: string;
    personnel_code: string;
    password: string;
    confirm_password: string;
    old_password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
  }

  export type UserData = Omit<User, 'id'>;

  export interface UserChangeStatus {
    activation_status: string;
    remove_user: boolean;
  }
}
