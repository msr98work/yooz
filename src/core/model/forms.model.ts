export namespace FormsModel {
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
}
