import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { IonModal } from '@ionic/angular/standalone';
import { ReorderEndCustomEvent } from '@ionic/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-request-state-dialog',
  templateUrl: './request-state-dialog.page.html',
  styleUrls: ['./request-state-dialog.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TranslateModule,
  ],
})
export class RequestStateDialogPage implements OnInit {
  modal = input<IonModal>();
  dismissChange = output<boolean>();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
  });
  inValidFieldForm = false;

  constructor() {}

  ngOnInit() {}

  getControl(key: string) {
    return this.form.get(key) as FormControl;
  }

  openForm() {
    this.inValidFieldForm = false;
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

  onSubmit() {}
}
