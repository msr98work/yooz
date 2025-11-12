import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          opacity: 0,
          overflow: 'hidden',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
          overflow: 'hidden',
        })
      ),
      transition('expanded <=> collapsed', [animate('250ms ease-in-out')]),
    ]),
  ],
})
export class FormPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  expandedItem: any = null; // فقط یکی باز می‌مونه

  wishList = [
    {
      title: 'Shanghai Disneyland ticket',
      price: 600,
      progress: 75,
      icon: 'assets/icons/disneyland.svg',
      details: [
        'Your wish list has been submitted on March 2, 2018',
        'You saved $60 in order to get it',
        'You saved $90 in order to get it',
        'You saved $200 in order to have it',
      ],
    },
    {
      title: 'Flight ticket to London',
      price: 500,
      progress: 50,
      icon: 'assets/icons/flight-london.svg',
      details: ['You saved $150 so far'],
    },
    {
      title: 'Beijing Happy Valley ticket',
      price: 400,
      progress: 30,
      icon: 'assets/icons/valley.svg',
      details: ['You saved $100 so far'],
    },
  ];

  toggleDetails(item: any) {
    // اگر همون آیتم کلیک بشه، ببندش
    if (this.expandedItem === item) {
      this.expandedItem = null;
    } else {
      this.expandedItem = item;
    }
  }

  isExpanded(item: any): boolean {
    return this.expandedItem === item;
  }
}
