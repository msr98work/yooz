import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonText,
  IonList,
  IonIcon,
  IonGrid,
  IonCard,
  IonAvatar,
  IonCardContent,
} from '@ionic/angular/standalone';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.page.html',
  styleUrls: ['./request-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSearchbar,
    IonText,
    IonList,
    IonIcon,
    NzSegmentedModule,
    IonGrid,
    IonCard,
    IonAvatar,
    IonCardContent,
    NzDividerModule,
    NzStepsModule,
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
export class RequestListPage implements OnInit {
  options = ['همه', 'درحال بررسی', 'تایید شده', 'رد شده'];
  expandedItem: any = null; // فقط یکی باز می‌مونه

  constructor() {}

  ngOnInit() {}
  handleValueChange(e: string | number): void {
    console.log(e);
  }

  filter: string = 'all';

  projects = [
    {
      name: 'Project Alpha',
      client: 'John Doe',
      status: 'Completed',
      amount: 2300,
      date: 'Oct 12, 2020',
      image: 'assets/img/project1.jpg',
    },
    {
      name: 'Project Beta',
      client: 'John Doe',
      status: 'Cancelled',
      amount: 1200,
      date: 'Oct 12, 2020',
      image: 'assets/img/project2.jpg',
    },
    {
      name: 'Project Gamma',
      client: 'John Doe',
      status: 'On Going',
      amount: 2500,
      date: 'Oct 12, 2020',
      image: 'assets/img/project3.jpg',
    },
    {
      name: 'Project Delta',
      client: 'John Doe',
      status: 'Pending',
      amount: 1800,
      date: 'Oct 12, 2020',
      image: 'assets/img/project4.jpg',
    },
  ];

  filteredProjects(): any[] {
    if (this.filter === 'all') return this.projects;
    if (this.filter === 'completed')
      return this.projects.filter((p) => p.status === 'Completed');
    if (this.filter === 'cancelled')
      return this.projects.filter((p) => p.status === 'Cancelled');
    return this.projects; // default
  }

  statusColor(status: string) {
    return {
      'status-completed': status === 'Completed',
      'status-cancelled': status === 'Cancelled',
      'status-pending': status === 'Pending',
      'status-ongoing': status === 'On Going',
    };
  }

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
