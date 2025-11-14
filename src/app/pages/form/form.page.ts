import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItemSliding,
  IonIcon,
  IonItem,
  IonAvatar,
  IonText,
  IonItemOptions,
  IonItemOption,
  IonToolbar,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { MainHeaderComponent } from '@pages/dashboard/main-header/main-header.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonToolbar,
    IonItemOption,
    IonItemOptions,
    IonText,
    IonAvatar,
    IonItem,
    IonIcon,
    IonItemSliding,
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    MainHeaderComponent,
  ],
})
export class FormPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
