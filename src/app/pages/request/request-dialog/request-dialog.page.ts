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
  IonText,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { TranslateModule } from '@ngx-translate/core';

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
    NzCascaderModule,
    TranslateModule,
    IonText,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
  ],
})
export class RequestDialogPage implements OnInit {
  form = new FormGroup({
    type: new FormControl(null, Validators.required),
  });

  options: NzCascaderOption[] = [
    {
      value: 'مرخصی',
      label: 'مرخصی',
      children: [
        {
          value: 'استحقاقی',
          label: 'استحقاقی',
          children: [
            { label: 'روزانه', value: 'روزانه', isLeaf: true },
            { label: 'ساعتی', value: 'ساعتی', isLeaf: true },
          ],
        },
        {
          value: 'استعلاجی',
          label: 'استعلاجی',
          children: [
            { label: 'روزانه', value: 'روزانه', isLeaf: true },
            { label: 'ساعتی', value: 'ساعتی', isLeaf: true },
          ],
        },
      ],
    },
    { label: 'اصلاح تردد', value: 'اصلاح تردد', isLeaf: true },
  ];

  constructor() {}

  getControl(key: string) {
    return this.form.get(key) as FormControl;
  }

  ngOnInit() {}

  onSubmit() {}
}
