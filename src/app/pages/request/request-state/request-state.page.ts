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
import { RequestStateDialogPage } from './request-state-dialog/request-state-dialog.page';

@Component({
  selector: 'app-request-state',
  templateUrl: './request-state.page.html',
  styleUrls: ['./request-state.page.scss'],
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
    RequestStateDialogPage,
  ],
})
export class RequestStatePage implements OnInit {
  private actionSheetCtrl = inject(ActionSheetController);
  private elementRef = inject(ElementRef);
  presentingElement!: HTMLElement | null;
  private canDismissOverride = false;

  constructor() {}

  ngOnInit() {
    this.presentingElement = this.elementRef.nativeElement;
  }

  onDismissChange(canDismiss: boolean) {
    // Allows the modal to be dismissed based on the state of the checkbox
    this.canDismissOverride = canDismiss;
  }

  onWillPresent() {
    // Resets the override when the modal is presented
    this.canDismissOverride = false;
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
