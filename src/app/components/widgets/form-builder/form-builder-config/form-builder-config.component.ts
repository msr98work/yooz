import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormBuilderUtil } from '../form-builder.util';
import { InputTextComponent } from '../../input/input-text/input-text.component';
import { InputTextareaComponent } from '../../input/input-textarea/input-textarea.component';
import { InputSelectComponent } from '../../input/input-select/input-select.component';
import { InputAutocompleteComponent } from '../../input/input-autocomplete/input-autocomplete.component';
import { UploadFileComponent } from '../../input/input-upload-file/input-upload-file.component';

@Component({
  selector: 'form-builder-config',
  templateUrl: './form-builder-config.component.html',
  styleUrls: ['./form-builder-config.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputAutocompleteComponent,
    UploadFileComponent,
  ],
})
export class FormBuilderConfigComponent implements OnInit {
  form = new FormGroup<
    FormBuilderUtil.FormGroupType<FormBuilderUtil.FormBuilderModel>
  >({
    name: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    type: new FormControl('string', [Validators.required]),
    widget: new FormControl('string'),
    readonly: new FormControl(false),
    required: new FormControl(false),
    placeHolder: new FormControl(''),
    default: new FormControl(''),
    description: new FormControl(''),
    visible: new FormGroup({
      field: new FormControl(''),
      operator: new FormControl(''),
      value: new FormControl(''),
    }),
    order: new FormControl(1),
    maxlength: new FormControl(null),
    minlength: new FormControl(null),
  });

  categories = [
    {
      value: 'value',
      label: 'label',
    },
    {
      value: 'value1',
      label: 'label',
    },
    {
      value: 'value2',
      label: 'label',
    },
    {
      value: 'value3',
      label: 'label',
    },
    {
      value: 'value4',
      label: 'label',
    },
    {
      value: 'value',
      label: 'label',
    },
  ];

  options: any[] = [
    { value: '1', label: 'AntDesign', group: 'Topics' },
    { value: '2', label: 'AntDesign UI', group: 'Topics' },
    { value: '3', label: 'AntDesign UI 有多好', group: 'Questions' },
    { value: '4', label: 'AntDesign 是啥', group: 'Questions' },
    { value: '5', label: 'AntDesign 是一个设计语言', group: 'Articles' },
    { value: '6', label: 'Angular', icon: 'logo-angular', group: 'Articles' },
    { value: '7', label: 'React', icon: 'logo-react', group: 'Articles' },
    {
      value: '8',
      label: 'Vue',
      icon: 'logo-vue',
      disabled: true,
      group: 'Articles',
    },
  ];

  constructor() {}

  ngOnInit() {}

  getControl(key: keyof FormBuilderUtil.FormBuilderModel) {
    return this.form.get(key) as FormControl;
  }
}
