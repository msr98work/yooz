import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  imports: [
    IonInput,
    CommonModule,
    ReactiveFormsModule,
    IonButton,
    IonIcon,
    TranslateModule,
  ],
})
export class InputPasswordComponent implements OnInit {
  control = input<FormControl>(null);
  class = input<string>('');
  label = input<string>('');
  fill = input<string>('outline');

  showPassword = false;

  constructor() {}

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
