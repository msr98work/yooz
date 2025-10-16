import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, IonContent } from '@ionic/angular/standalone';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainTabsComponent } from './main-tabs/main-tabs.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonRouterOutlet, IonContent, MainMenuComponent, MainTabsComponent],
})
export class DashboardPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
