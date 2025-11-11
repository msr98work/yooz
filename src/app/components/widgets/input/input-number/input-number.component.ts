import { Component, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonText, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  standalone: true,
  imports: [IonInput, IonText, ReactiveFormsModule, TranslateModule],
})
export class InputNumberComponent implements OnInit {
  control = input.required<FormControl>();
  class = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  fill = input<string>('outline');
  min = input<number>();
  max = input<number>();
  step = input<number>(1);

  constructor() {}

  ngOnInit() {}
}
