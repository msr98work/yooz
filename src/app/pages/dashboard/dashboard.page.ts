import { Component, inject, OnInit } from '@angular/core';
import { IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainTabsComponent } from './main-tabs/main-tabs.component';
import { UserService } from '@service/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonContent, MainMenuComponent, MainTabsComponent],
})
export class DashboardPage implements OnInit {
  private userService = inject(UserService);
  constructor() {
    console.log('dashboard constructor');
    this.userService.getMeInfo().subscribe((response) => {
      if (response?.success) {
        this.userService.me.set(response.result);
      }
    });
  }

  ngOnInit() {}

  ionViewWillUnload() {
    console.log('ion will view leave');
  }
  ionViewWillEnter() {
    console.log('ion will view enter');
  }
}
