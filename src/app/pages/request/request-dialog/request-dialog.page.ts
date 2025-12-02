import { Component, inject, OnInit } from '@angular/core';
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
import { RequestService } from '@service/request/request.service';
import { FormBuilderCreationComponent } from '@widget/form-builder/form-builder-creation/form-builder-creation.component';

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
    FormBuilderCreationComponent,
  ],
})
export class RequestDialogPage implements OnInit {
  private requestService = inject(RequestService);

  form = new FormGroup({
    type: new FormControl(null, Validators.required),
  });
  loading = false;
  options = [];
  dynamicForm = null;

  constructor() {}

  getControl(key: string) {
    return this.form.get(key) as FormControl;
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.loading = true;
    this.requestService
      .getTypeAll({
        is_tree: true,
      })
      .subscribe((response) => {
        if (response.success) {
          this.options = response.result;
        }
        this.loading = false;
      });
  }
  onSubmit() {}
}
