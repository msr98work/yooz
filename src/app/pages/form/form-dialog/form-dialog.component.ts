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
import { FormsModel } from '@model/forms.model';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextComponent } from 'src/app/components/widgets/input/input-text/input-text.component';
import { FormFieldDialogComponent } from '../form-field-dialog/form-field-dialog.component';
import { InputSelectModel } from 'src/app/components/widgets/input/input-select/input-select.model';
import { FormBuilderUtil } from 'src/app/components/widgets/form-builder/form-builder.util';

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
    FormFieldDialogComponent,
  ],
})
export class FormDialogComponent implements OnInit {
  modal = input<IonModal>();
  dismissChange = output<boolean>();

  form = new FormGroup<FormBuilderUtil.FormGroupType<Form>>({
    title: new FormControl('', Validators.required),
  });
  listField: FormsModel.FormField[] = [];
  fields: InputSelectModel[] = [];
  constructor() {}

  ngOnInit() {}

  getControl(key: keyof Form) {
    return this.form.get(key) as FormControl;
  }

  onSubmit() {}

  close() {
    const checked = !this.form.dirty;
    this.dismissChange.emit(checked);
    this.modal().dismiss();
  }

  handleReorderEnd(event: ReorderEndCustomEvent) {
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }

  saveField(value: FormsModel.FormField) {
    this.listField.push(value);
    this.fields = this.listField.map((field) => {
      return {
        value: field.name,
        label: field.title,
      };
    });
  }
}
