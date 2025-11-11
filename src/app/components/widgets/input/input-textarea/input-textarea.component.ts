import { Component, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonText, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
  standalone: true,
  imports: [IonTextarea, IonText, ReactiveFormsModule, TranslateModule],
})
export class InputTextareaComponent implements OnInit {
  control = input.required<FormControl>();
  class = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  fill = input<string>('outline');
  rows = input<number>(4);
  autoGrow = input<boolean>(false);

  constructor() {}

  ngOnInit() {}
}
