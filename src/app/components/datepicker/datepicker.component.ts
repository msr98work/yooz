import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IActiveDate, IDatepickerTheme } from 'ng-persian-datepicker';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  imports: [NgPersianDatepickerModule, CommonModule, ReactiveFormsModule],
})
export class DatepickerComponent implements OnInit {
  @Input() control: FormControl;
  @Input() timeEnable = false;
  @Input() dateFormat: string = 'YYYY/MM/DD';
  @Input() dateGregorianFormat: string = 'YYYY/MM/DD';
  @Input() initValue: boolean = false;
  @Input() placeholder: string = '';
  @Input() hideOnSelect = true;
  @Input() defaultValidationError = true;
  @Output() dateOnSelect: EventEmitter<IActiveDate> = new EventEmitter();

  customTheme: Partial<IDatepickerTheme> = {
    selectedBackground: '#24b5b0',
    selectedText: '#FFFFFF',
    hoverBackground: '#f1f1f1',
    hoverText: 'rgb(51, 51, 51)',
  };

  ngOnInit(): void {}

  onSelect(date: IActiveDate) {
    this.dateOnSelect.emit(date);
  }
}
