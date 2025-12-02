import { Form } from '@angular/forms';

export namespace WorkflowModel {
  export interface Full {
    id: number;
    title: string;
    form: Form;
  }

  export type Create = Pick<Full, 'title'> & {
    form: number;
    states: {
      from_state: number;
      to_state: number;
    }[];
    start_state: number;
  };
}
