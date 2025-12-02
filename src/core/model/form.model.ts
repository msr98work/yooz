export namespace FormModel {
  export interface Full {
    id: number;
    title: string;
    schema: string;
  }
  export type Create = Pick<Full, 'title' | 'schema'>;
}
