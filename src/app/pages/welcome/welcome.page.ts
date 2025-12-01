import {
  Component,
  OnInit,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomePage implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  slides = [
    {
      image: 'https://picsum.photos/800/400?random=1',
      title: 'اسلاید اول',
      description: 'توضیحات اسلاید اول',
    },
    {
      image: 'https://picsum.photos/800/400?random=2',
      title: 'اسلاید دوم',
      description: 'توضیحات اسلاید دوم',
    },
    {
      image: 'https://picsum.photos/800/400?random=3',
      title: 'اسلاید سوم',
      description: 'توضیحات اسلاید سوم',
    },
    {
      image: 'https://picsum.photos/800/400?random=4',
      title: 'اسلاید چهارم',
      description: 'توضیحات اسلاید چهارم',
    },
  ];

  ngAfterViewInit() {
    // تنظیمات پویا برای Swiper
    if (this.swiperContainer?.nativeElement) {
      const swiperEl = this.swiperContainer.nativeElement;

      Object.assign(swiperEl, {
        // تنظیمات پایه
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,

        // Pagination
        pagination: {
          clickable: true,
          dynamicBullets: true,
        },

        // Navigation
        navigation: true,

        // Autoplay
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },

        // Loop
        loop: true,

        // Breakpoints برای Responsive
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },

        // Event Listeners
        on: {
          init: () => {
            console.log('Swiper initialized');
          },
          slideChange: () => {
            console.log('Slide changed');
          },
        },
      });

      // راه‌اندازی Swiper
      swiperEl.initialize();
    }
  }
  slideNext() {
    // if (this.swiper) {
    //   this.swiper.slideNext();
    // }
  }

  slidePrev() {
    // if (this.swiper) {
    //   this.swiper.slidePrev();
    // }
  }
}
