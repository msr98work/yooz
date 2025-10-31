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
import { addIcons } from 'ionicons';
import {
  logoIonic,
  person,
  fileTrayFull,
  add,
  pieChart,
  home,
} from 'ionicons/icons';
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

  constructor() {
    addIcons({ logoIonic, person, fileTrayFull, add, pieChart, home });
  }

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }
  gotoNewRequest() {
    this.navController.navigateForward(['/new-request']);
    // this.widgetModalService.openTemplate({
    //   templateRef: this.formModal,
    //   buttons: [
    //     {
    //       id: 'submit',
    //       action: (button, modal) => {},
    //       icon: 'checkmark-outline',
    //       title: 'ثبت',
    //       disabled: false,
    //     },
    //   ],
    //   title: 'کاربر جدید',
    //   actionCloseModal: () => {
    //     this.widgetModalService.closeModal();
    //   },
    //   backdropDismiss: false,
    // });
  }
}
