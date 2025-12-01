import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  IonTabs,
  IonFabButton,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.scss'],
  imports: [
    IonTabs,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonFabButton,
    CommonModule,
  ],
})
export class MainTabsComponent implements OnInit {
  // private widgetModalService = inject(WidgetModalService);
  private navController = inject(NavController);

  @ViewChild('formModal', {
    static: true,
  })
  formModal!: TemplateRef<any>;

  // Typically referenced to your ion-router-outlet
  presentingElement!: HTMLElement | null;

  async canDismiss(data?: undefined, role?: string) {
    return role !== 'gesture';
  }

  constructor() {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }
  gotoNewRequest() {
    this.navController.navigateForward(['request-dialog']);
  }
}
