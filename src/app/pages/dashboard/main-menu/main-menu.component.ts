import {
  IonButton,
  IonMenu,
  IonContent,
  IonLabel,
  IonIcon,
  IonFooter,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [
    IonToolbar,
    IonFooter,
    IonIcon,
    IonLabel,
    IonButton,
    IonMenu,
    IonContent,
  ],
})
export class MainMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
