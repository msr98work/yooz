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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'form-builder-config',
  templateUrl: './form-builder-config.component.html',
  styleUrls: ['./form-builder-config.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextComponent],
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

  constructor() {}

  ngOnInit() {}

  getControl(key: keyof FormBuilderUtil.FormBuilderModel) {
    return this.form.get(key) as FormControl;
  }
}
