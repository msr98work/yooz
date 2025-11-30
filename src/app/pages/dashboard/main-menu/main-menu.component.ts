import { TranslateModule } from '@ngx-translate/core';
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
  IonTitle,
  IonHeader,
} from '@ionic/angular/standalone';
import { Component, effect, inject, OnInit } from '@angular/core';
import { UserService } from '@service/user/user.service';
import { UserModel } from '@model/user.model';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [
    IonHeader,
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
    TranslateModule,
    RouterLinkWithHref,
    RouterLinkActive,
  ],
})
export class MainMenuComponent implements OnInit {
  private userSerivce = inject(UserService);

  user: UserModel.Full;
  isProcessSubMenuOpen = false;

  constructor() {
    effect(() => {
      this.user = this.userSerivce.me();
    });
  }

  ngOnInit(): void {}

  logout() {}

  toggleProcessSubMenu() {
    this.isProcessSubMenuOpen = !this.isProcessSubMenuOpen;
  }
}
