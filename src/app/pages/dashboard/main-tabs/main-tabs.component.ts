import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  IonTabs,
  IonFabButton,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButtons,
  IonButton,
  IonFooter,
  IonSpinner,
  IonText,
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

@Component({
  selector: 'app-main-tabs',
  templateUrl: './main-tabs.component.html',
  styleUrls: ['./main-tabs.component.scss'],
  imports: [
    IonModal,
    IonTabs,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonFabButton,
    // NewRequestComponent,
    CommonModule,
  ],
})
export class MainTabsComponent implements OnInit {
  // private widgetModalService = inject(WidgetModalService);

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
  newRequest() {
    // this.navController.navigateForward(['/dashboard/new-request']);
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
