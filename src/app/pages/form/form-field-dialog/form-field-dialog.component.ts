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
    IonIcon,
    TranslateModule,

    NzDividerModule,
  ],
})
export class FormFieldDialogComponent implements OnInit {
  modal = input<IonModal>();
  dismissChange = output<boolean>();

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    if (this.fields().find((field) => field.value == this.form.value.name)) {
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
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);
    event.detail.complete();
  }
}
