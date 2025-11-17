import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilderUtil } from '../form-builder.util';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextComponent } from '../../input/input-text/input-text.component';
import { InputSelectComponent } from '../../input/input-select/input-select.component';
import { InputCheckboxComponent } from '../../input/input-checkbox/input-checkbox.component';
import { InputTextareaComponent } from '../../input/input-textarea/input-textarea.component';
import { InputUtil } from '../../input/input.util';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'form-builder-config',
  templateUrl: './form-builder-config.component.html',
  styleUrls: ['./form-builder-config.component.scss'],
  imports: [
    InputTextComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputTextareaComponent,
    FormsModule,
    ReactiveFormsModule,
    NzDividerModule,
    TranslateModule,
  ],
})
export class FormBuilderConfigComponent implements OnInit {
  fields = input<InputUtil.InputSelectModel[]>([]);
  submit = output<FormBuilderUtil.FormDataConfig>();

  form = new FormGroup<
    FormBuilderUtil.FormGroupType<FormBuilderUtil.FormField>
  >({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required),
    widget: new FormControl('', Validators.required),
    required: new FormControl(false),
    readonly: new FormControl(false),
    placeHolder: new FormControl(''),
    default: new FormControl(''),
    description: new FormControl(''),
    visible: new FormGroup<
      FormBuilderUtil.FormGroupType<FormBuilderUtil.Visible>
    >({
      field: new FormControl(''),
      condition: new FormControl('equal'),
      value: new FormControl(''),
    }),
  });
  types = FormBuilderUtil.FORMBUILDERTYPE;
  widgets: InputUtil.InputSelectModel[] = [];
  conditions: InputUtil.InputSelectModel[] = [
    {
      value: 'equal',
      label: 'Equal',
    },
    {
      value: 'not_empty',
      label: 'NotEmpty',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.getVisibleControl('field').valueChanges.subscribe((value) => {
      if (!value) {
        this.getVisibleControl('field').clearValidators();
        this.getVisibleControl('condition').clearValidators();
        this.getVisibleControl('value').clearValidators();
        this.getControl('visible').patchValue({
          field: null,
          condition: 'equal',
          value: '',
        } as any);
      } else {
        this.getVisibleControl('field').addValidators([Validators.required]);
        this.getVisibleControl('value').addValidators([Validators.required]);
        this.getVisibleControl('condition').addValidators([
          Validators.required,
        ]);
      }
    });
    this.getControl('type').valueChanges.subscribe((value) => {
      this.widgets = value
        ? this.types.find((type) => type.value == value).widgets
        : [];
      this.getControl('widget').setValue('');
      this.getControl('widget').updateValueAndValidity();
    });

    // debounceTime(400)
    this.form.valueChanges.pipe().subscribe((data) => {
      this.submit.emit({
        formData: data as FormBuilderUtil.FormField,
        isValid: this.form.valid,
      });
    });
  }

  getControl(key: keyof FormBuilderUtil.FormField) {
    return this.form.get(key) as FormControl;
  }

  getVisibleControl(key: keyof FormBuilderUtil.Visible) {
    return this.getControl('visible').get(key) as FormControl;
  }
}
