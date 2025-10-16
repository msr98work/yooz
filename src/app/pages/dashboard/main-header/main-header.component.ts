import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonBadge,
  IonImg,
  IonText,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [
    IonText,
    IonImg,
    IonBadge,
    IonIcon,
    IonButton,
    IonToolbar,
    IonHeader,
    IonMenuButton,
  ],
})
export class MainHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
