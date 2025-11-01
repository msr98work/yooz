import { FormArray, FormControl, FormGroup } from '@angular/forms';

export namespace FormBuilderUtil {
  function convertFormBuilderToJson(data: FormBuilderModel) {
    return {
      name: data.name,
      title: data.title,
      type: data.type,
      widget: data.widget,
      readonly: data.readonly,
      required: data.required,
      default: data.default,
      place_holder: data.placeHolder,
      description: data.description,
      order: data.order,
      ...(['number', 'string'].includes(data.widget) && {
        ...(typeof data.maxlength == 'number' && {
          maxlength: data.maxlength,
        }),
        ...(typeof data.minlength == 'number' && {
          minlength: data.minlength,
        }),
      }),
      visible: data.visible?.field
        ? {
            field: data.visible.field,
            condition: data.visible.operator,
            value: data.visible.value,
          }
        : {},
    };
  }

  export interface FormBuilderModel {
    name: string;
    title: string;
    type: FormBuilderTypes;
    widget: string;
    readonly: boolean;
    required: boolean;
    default: string;
    placeHolder: string;
    description: string;
    order: number;
    maxlength: number;
    minlength: number;
    visible: FormBuilderVisibleModel;
  }
  export type FormBuilderTypes = 'string' | 'number' | 'boolean';
  export type FormBuilderOperator = 'equal' | 'empty' | 'not_empty';
  export interface FormBuilderVisibleModel {
    field: string;
    operator: string;
    value: string;
  }

  type FieldType<T, K extends keyof T> = T[K];
  type ArrayToObject<Model> = Model extends Array<infer U> ? U : never;
  export type FormGroupType<Model> = {
    [x in keyof Model]: FieldType<Model, x> extends Array<any>
      ? FormArray<FormGroup<FormGroupType<ArrayToObject<FieldType<Model, x>>>>>
      : FieldType<Model, x> extends object
      ? FormGroup<FormGroupType<FieldType<Model, x>>>
      : FormControl<FieldType<Model, x>>;
  };
}
