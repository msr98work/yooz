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
import { FormGroupType } from '@model/reactiveform.model';
import { AutocompleteComponent } from 'src/app/components/autocomplete/autocomplete.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { FormBuilderConfigComponent } from 'src/app/components/widgets/form-builder/form-builder-config/form-builder-config.component';
@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.page.html',
  styleUrls: ['./new-request.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteComponent,
    NzButtonModule,
    NzAutocompleteModule,
    FormBuilderConfigComponent,
  ],
})
export class NewRequestPage implements OnInit {
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
