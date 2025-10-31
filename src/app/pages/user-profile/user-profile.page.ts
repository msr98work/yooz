import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonModal,
  IonButton,
} from '@ionic/angular/standalone';
import { UserService } from '@service/user/user.service';
import { UserModel } from '@model/user.model';
import { NavController } from '@ionic/angular';
import { LocalStorage } from '@db/local-storage.database';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonModal, IonIcon, IonContent, CommonModule],
})
export class UserProfilePage implements OnInit {
  private userSerivce = inject(UserService);
  private navController = inject(NavController);

  isModalOpen = false;
  user: UserModel.Full;

  constructor() {
    effect(() => {
      this.user = this.userSerivce.me();
    });
  }

  ngOnInit() {}

  setOpen(status) {
    this.isModalOpen = status;
  }

  logout() {
    this.isModalOpen = false;
    this.navController.navigateForward(['/sign-in']);
    LocalStorage.clear();
  }
}
