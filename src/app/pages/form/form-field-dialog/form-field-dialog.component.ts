import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonToolbar,
  IonTitle,
  IonIcon,
  ReorderEndCustomEvent,
} from '@ionic/angular/standalone';
import { FormsModel } from '@model/forms.model';
import { FormGroupType } from '@model/reactiveform.model';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextComponent } from 'src/app/components/widgets/input/input-text/input-text.component';
import { InputSelectComponent } from 'src/app/components/widgets/input/input-select/input-select.component';
import { InputCheckboxComponent } from 'src/app/components/widgets/input/input-checkbox/input-checkbox.component';
import { InputTextareaComponent } from 'src/app/components/widgets/input/input-textarea/input-textarea.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-form-field-dialog',
  templateUrl: './form-field-dialog.component.html',
  styleUrls: ['./form-field-dialog.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    IonIcon,
    TranslateModule,
    InputSelectComponent,
    InputCheckboxComponent,
    InputTextareaComponent,
    NzDividerModule,
  ],
})
export class FormFieldDialogComponent implements OnInit {
  modal = input<IonModal>();
  fields = input<FormsModel.FormField[]>([]);
  dismissChange = output<boolean>();
  submit = output<FormsModel.FormField>();
  form = new FormGroup<FormGroupType<FormsModel.FormField>>({
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl(null, Validators.required),
    widget: new FormControl('', Validators.required),
    required: new FormControl(false),
    readonly: new FormControl(false),
    placeHolder: new FormControl(''),
    default: new FormControl(''),
    description: new FormControl(''),
    visible: new FormGroup({
      field: new FormControl(''),
      condition: new FormControl(null),
      value: new FormControl(''),
    }),
  });
  types = FormsModel.FORMBUILDERTYPE;
  widgets = [];
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
  }

  getControl(key: keyof FormsModel.FormField) {
    return this.form.get(key) as FormControl;
  }

  getVisibleControl(key: keyof FormsModel.Visible) {
    return this.getControl('visible').get(key) as FormControl;
  }

  onSubmit() {
    if (this.fields().find((field) => field.name == this.form.value.name)) {
      // alert
    } else {
      this.submit.emit(this.form.value as FormsModel.FormField);
      this.modal().dismiss();
    }
  }

  close() {
    const checked = !this.form.dirty;
    this.dismissChange.emit(checked);
    this.modal().dismiss();
  }

  handleReorderEnd(event: ReorderEndCustomEvent) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  }
}
