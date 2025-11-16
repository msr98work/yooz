import { FormArray, FormControl, FormGroup } from '@angular/forms';

export namespace FormBuilderUtil {
  function convertFormBuilderToJson(data: FormField) {
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
      // ...(['number', 'string'].includes(data.widget) && {
      //   ...(typeof data.maxlength == 'number' && {
      //     maxlength: data.maxlength,
      //   }),
      //   ...(typeof data.minlength == 'number' && {
      //     minlength: data.minlength,
      //   }),
      // }),
      visible: data.visible?.field
        ? {
            field: data.visible.field,
            condition: data.visible.condition,
            value: data.visible.value,
          }
        : {},
    };
  }

  export interface FormField {
    title: string;
    name: string;
    type: FormBuilderTypes;
    widget: string;
    placeHolder: string;
    default: string;
    description: string;
    required: boolean;
    readonly: boolean;
    order?: number;
    visible: Visible;
  }

  export type FieldCondition = 'equal' | 'not_empty';
  export interface Visible {
    field: string;
    condition: FieldCondition;
    value: string;
  }

  export type FormBuilderTypes = 'string' | 'number' | 'boolean' | 'datetime';
  export interface FormBuilder {
    label: string;
    value: FormBuilderTypes;
    widgets: {
      label: string;
      value: string;
    }[];
  }

  export const FORMBUILDERTYPE: FormBuilder[] = [
    {
      label: 'String',
      value: 'string',
      widgets: [
        {
          value: 'string',
          label: 'String',
        },
        {
          value: 'textarea',
          label: 'Textarea',
        },
        {
          value: 'select',
          label: 'Select',
        },
        {
          value: 'Computational',
          label: 'ComputationalField',
        },
        {
          value: 'file',
          label: 'File',
        },
      ],
    },
    {
      label: 'Number',
      value: 'number',
      widgets: [
        {
          value: 'number',
          label: 'Number',
        },
        {
          value: 'select',
          label: 'Select',
        },
        {
          value: 'Computational',
          label: 'ComputationalField',
        },
      ],
    },
    {
      label: 'Datetime',
      value: 'datetime',
      widgets: [
        {
          value: 'datetime',
          label: 'Datetime',
        },
        {
          value: 'date',
          label: 'Date',
        },
        {
          value: 'time',
          label: 'Time',
        },
      ],
    },
    {
      label: 'Boolean',
      value: 'boolean',
      widgets: [
        {
          value: 'checkbox',
          label: 'Checkbox',
        },
      ],
    },
  ];

  export interface InputSelectModel {
    value: any;
    label: string;
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
