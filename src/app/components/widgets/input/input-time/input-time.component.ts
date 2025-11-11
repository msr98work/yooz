import { Component, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonText, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'input-time',
  templateUrl: './input-time.component.html',
  styleUrls: ['./input-time.component.scss'],
  standalone: true,
  imports: [IonInput, IonText, ReactiveFormsModule, TranslateModule],
})
export class InputTimeComponent implements OnInit {
  control = input.required<FormControl>();
  class = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  fill = input<string>('outline');

  constructor() {}

  ngOnInit() {}
}
