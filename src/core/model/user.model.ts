export namespace UserModel {
  export interface Full {
    email: string;
  }
  export interface Create extends Full {
    password: string;
    generated_code: string;
  }
}
