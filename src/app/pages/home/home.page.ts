import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  IonContent,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { RequestModel } from '@model/request.model';
import { MainHeaderComponent } from '@pages/dashboard/main-header/main-header.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonText, IonContent, MainHeaderComponent],
})
export class HomePage {
  requestsList: RequestModel.Full[] = [];
  loading = false;

  constructor() {}

  ionViewWillEnter() {
    // this.getList();
  }

  getList() {
    this.loading = true;
    // this.requestService
    //   .getByParams({
    //     limit: 50,
    //     offset: 0,
    //   })
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe((response) => {
    //     if (response.success) {
    //       this.requestsList = response.result.results;
    //     }
    //     this.loading = false;
    //   });
  }
}
