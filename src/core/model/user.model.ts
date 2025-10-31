export namespace UserModel {
  export interface Full {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    gender: 'male' | 'female';
    username: string;
    password: string;
    full_name: string;
    position: string;
  }
  export interface Create extends Full {
    password: string;
    generated_code: string;
  }
}
