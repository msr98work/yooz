import { Component, input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { IonText, IonSelect, IonSelectOption } from '@ionic/angular/standalone';

interface SelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  standalone: true,
  imports: [
    IonSelect,
    IonSelectOption,
    IonText,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class InputSelectComponent implements OnInit {
  control = input.required<FormControl>();
  class = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  fill = input<string>('outline');
  options = input.required<SelectOption[]>();
  multiple = input<boolean>(false);
  interface = input<string>('action-sheet');

  constructor() {}

  ngOnInit() {}
}
