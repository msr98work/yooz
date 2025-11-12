import {
  IonButton,
  IonMenu,
  IonContent,
  IonLabel,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonItem,
  IonList,
  IonText,
} from '@ionic/angular/standalone';
import { Component, effect, inject, OnInit } from '@angular/core';
import { UserService } from '@service/user/user.service';
import { UserModel } from '@model/user.model';

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
    IonItem,
    IonList,
    IonText,
  ],
})
export class MainMenuComponent implements OnInit {
  private userSerivce = inject(UserService);

  user: UserModel.Full;

  constructor() {
    effect(() => {
      this.user = this.userSerivce.me();
    });
  }

  ngOnInit(): void {}

  logout() {}
}
