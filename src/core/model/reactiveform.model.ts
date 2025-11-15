import { FormArray, FormControl, FormGroup } from '@angular/forms';

type FieldType<T, K extends keyof T> = T[K];
export type FormGroupType<Model> = {
  [x in keyof Model]: FieldType<Model, x> extends object
    ? FormGroup<FormGroupType<FieldType<Model, x>>>
    : FormControl<FieldType<Model, x>>;
};
