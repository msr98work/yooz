import { Component, input, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonBadge,
  IonImg,
  IonText,
  IonSearchbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [
    IonSearchbar,
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
  isSearch = input<boolean>(true);
  // he = window.innerHeight;
  // wi = window.innerWidth;
  constructor() {}

  ngOnInit() {}

  onSearch() {}
}
