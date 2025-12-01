import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItemSliding,
  IonIcon,
  IonItem,
  IonAvatar,
  IonText,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonModal,
  ActionSheetController,
} from '@ionic/angular/standalone';
import { MainHeaderComponent } from '@pages/dashboard/main-header/main-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { RequestTypeDialogComponent } from './request-type-dialog/request-type-dialog.component';
import { IonBreadcrumb, IonBreadcrumbs } from '@ionic/angular/standalone';

@Component({
  selector: 'app-request-type',
  templateUrl: './request-type.page.html',
  styleUrls: ['./request-type.page.scss'],
  standalone: true,
  imports: [
    IonItemOption,
    IonItemOptions,
    IonText,
    IonAvatar,
    IonItem,
    IonIcon,
    IonItemSliding,
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    MainHeaderComponent,
    TranslateModule,
    IonFab,
    IonFabButton,
    IonModal,
    RequestTypeDialogComponent,
    IonBreadcrumb,
    IonBreadcrumbs,
  ],
})
export class RequestTypePage implements OnInit {
  private actionSheetCtrl = inject(ActionSheetController);
  private elementRef = inject(ElementRef);
  presentingElement!: HTMLElement | null;
  private canDismissOverride = false;
  maxBreadcrumbs? = 3;
  originalList = [
    {
      title: 'مرخصی',
      children: [
        {
          title: 'استحقاقی',
          workflow: {
            id: 1,
            title: 'مرخصی استحقاقی',
          },
        },
        {
          title: 'استعلاجی',
          workflow: {
            id: 2,
            title: 'مرخصی استعلاجی',
          },
        },
      ],
    },
  ];
  list = [];
  breadCrumbs = [];

  constructor() {}

  ngOnInit() {
    this.presentingElement = this.elementRef.nativeElement;
    this.list = this.originalList;
  }

  onDismissChange(canDismiss: boolean) {
    // Allows the modal to be dismissed based on the state of the checkbox
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    // Resets the override when the modal is presented
    this.canDismissOverride = false;
  }

  expandBreadcrumbs() {
    this.maxBreadcrumbs = undefined;
  }

  breadcrumbItem(item) {
    this.breadCrumbs.pop();
  }

  showChildrens(item) {
    this.breadCrumbs.push(item);
    this.list = item.children;
  }

  canDismiss = async () => {
    if (this.canDismissOverride) {
      // Checks for the override flag to return early if we can dismiss the overlay immediately
      return true;
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
}
