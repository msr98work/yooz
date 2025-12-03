import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormBuilderUtil } from '../form-builder.util';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextComponent } from '@widget/input/input-text/input-text.component';
import { InputTimeComponent } from '@widget/input/input-time/input-time.component';
import { InputTextareaComponent } from '@widget/input/input-textarea/input-textarea.component';
import { InputSelectComponent } from '@widget/input/input-select/input-select.component';
import { InputCheckboxComponent } from '@widget/input/input-checkbox/input-checkbox.component';
import { InputNumberComponent } from '@widget/input/input-number/input-number.component';
import { UploadFileComponent } from '@widget/input/input-upload-file/input-upload-file.component';

@Component({
  selector: 'form-builder-creation',
  templateUrl: './form-builder-creation.component.html',
  styleUrls: ['./form-builder-creation.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    InputTimeComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputCheckboxComponent,
    InputNumberComponent,
    UploadFileComponent,
  ],
})
export class FormBuilderCreationComponent implements OnInit {
  model = input<FormBuilderUtil.FormField[]>([]);
  formData = input<object>();
  formDisable = input<boolean>(false);
  changeValue = output<{ form?: object; valid: boolean }>();

  form: FormGroup;

  constructor() {
    effect(() => {
      this.form.patchValue(this.formData());
    });
  }

  ngOnInit() {
    this.createFormSchema();
  }

  createFormSchema() {
    let form = {};
    let model = this.model()
      .filter((field) => field.widget != 'computational')
      .sort((a, b) => a.order - b.order);
    model.forEach((field) => {
      field.placeHolder = field.placeHolder || '';
      let control = new FormControl(
        field.type == 'string'
          ? field.default
            ? field.default
            : ''
          : field.type == 'number'
          ? field.default
            ? +field.default
            : null
          : field.type == 'boolean'
          ? field.default
            ? field.default
            : false
          : null,
        this.setValidations(field)
      );
      form[field.name] = control;
    });
    this.form = new FormGroup(form);
    this.emitValueChanges();

    if (this.formDisable()) {
      this.form.disable();
    }

    this.form.valueChanges.subscribe((value) => {
      this.emitValueChanges();
    });
  }

  setValidations(field: FormBuilderUtil.FormField) {
    let validations = [];
    if (field.required) {
      validations.push(Validators.required);
    }
    // if (typeof field. == "number") {
    //   validations.push(
    //     field.widget == "number"
    //       ? Validators.max(field.maxlength)
    //       : Validators.maxLength(field.maxlength)
    //   );
    // }
    // if (typeof field.minlength == "number") {
    //   validations.push(
    //     field.widget == "number"
    //       ? Validators.min(field.minlength)
    //       : Validators.minLength(field.minlength)
    //  );
    // }
    return validations;
  }

  emitValueChanges() {
    this.changeValue.emit({
      form: this.form.value,
      valid: this.form.valid,
    });
  }

  getControl(key) {
    return this.form.get(key) as FormControl;
  }
}
