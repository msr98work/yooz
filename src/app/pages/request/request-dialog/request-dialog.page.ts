import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.page.html',
  styleUrls: ['./request-dialog.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzAutocompleteModule,
  ],
})
export class RequestDialogPage implements OnInit {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
  });

  constructor() {}

  getControl(key: 'username') {
    return this.form.get(key) as FormControl;
  }

  ngOnInit() {}

  onSubmit() {}
}
