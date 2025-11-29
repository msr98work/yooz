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
  IonItem,
  IonList,
  IonModal,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonText,
  IonRow,
  IonCol,
  IonGrid,
  IonReorderGroup,
  ReorderEndCustomEvent,
  IonReorder,
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextComponent } from 'src/app/components/widgets/input/input-text/input-text.component';
import { FormBuilderUtil } from 'src/app/components/widgets/form-builder/form-builder.util';
import { InputUtil } from 'src/app/components/widgets/input/input.util';
import { FormBuilderConfigComponent } from 'src/app/components/widgets/form-builder/form-builder-config/form-builder-config.component';

type Form = { title: string };
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
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
    IonList,
    IonItem,
    IonText,
    IonRow,
    IonCol,
    IonGrid,
    IonReorderGroup,
    IonReorder,
    IonModal,
    TranslateModule,
    FormBuilderConfigComponent,
  ],
})
export class FormDialogComponent implements OnInit {
  modal = input<IonModal>();
  dismissChange = output<boolean>();

  form = new FormGroup<FormBuilderUtil.FormGroupType<Form>>({
    title: new FormControl('', Validators.required),
  });
  listField: FormBuilderUtil.FormField[] = [];
  fields: InputUtil.InputSelectModel[] = [];
  inValidFieldForm = false;
  activeFieldForm: FormBuilderUtil.FormField;

  constructor() {}

  ngOnInit() {}

  getControl(key: keyof Form) {
    return this.form.get(key) as FormControl;
  }

  openForm() {
    this.inValidFieldForm = false;
    this.activeFieldForm = null;
  }

  close() {
    const checked = !this.form.dirty;
    this.dismissChange.emit(checked);
    this.modal().dismiss();
  }

  closeFieldFormModal(modal: IonModal) {
    modal.dismiss();
  }

  handleReorderEnd(event: ReorderEndCustomEvent) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  saveField(value: FormBuilderUtil.FormDataConfig) {
    this.inValidFieldForm = value.isValid;
    this.activeFieldForm = value.formData;
  }

  onSubmitFieldForm(modal: IonModal) {
    this.listField.push(this.activeFieldForm);
    this.fields = this.listField.map((field) => {
      return {
        value: field.name,
        label: field.title,
      };
    });
    this.closeFieldFormModal(modal);
  }

  onSubmit() {}
}
