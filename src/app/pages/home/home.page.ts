import { Component } from '@angular/core';
import {
  IonContent,
  IonText,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { RequestModel } from '@model/request.model';
import { MainHeaderComponent } from '@pages/dashboard/main-header/main-header.component';
import { CardDateComponent } from './card-date/card-date.component';
import { MonthDaysComponent } from './month-days/month-days.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonText,
    IonContent,
    MainHeaderComponent,
    CardDateComponent,
    MonthDaysComponent,
  ],
})
export class HomePage {
  requestsList: RequestModel.Full[] = [];
  loading = false;

  constructor() {}

  ionViewWillEnter() {
    // this.getList();
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
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
