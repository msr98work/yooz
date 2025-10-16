import { inject, Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private toastController = inject(ToastController);
  defaultOptions: ToastOptions = {
    duration: 3000,
    position: 'top',
    animated: true,
    layout: 'stacked',
    cssClass: 'message-toast',
    translucent: true,
  };
  async success(options?: ToastOptions) {
    const toast = await this.toastController.create({
      message: 'عملیات با موفقیت انجام شد.',
      color: 'success',
      icon: 'checkmark-circle',
      ...this.defaultOptions,
      ...options,
    });
    await toast.present();
  }

  async error(options?: ToastOptions) {
    const toast = await this.toastController.create({
      message: 'خطا در اجرای عملیات',
      color: 'danger',
      icon: 'close-circle',
      ...this.defaultOptions,
      ...options,
    });
    await toast.present();
  }

  async warning(options?: ToastOptions) {
    const toast = await this.toastController.create({
      message: 'هشدار',
      color: 'warning',
      icon: 'warning',
      ...this.defaultOptions,
      ...options,
    });
    await toast.present();
  }

  async info(options?: ToastOptions) {
    const toast = await this.toastController.create({
      message: 'اطلاعات',
      color: 'tertiary',
      icon: 'information-circle',
      ...this.defaultOptions,
      ...options,
    });
    await toast.present();
  }

  async confirm(options: { options?: ToastOptions; handler: () => any }) {
    const toast = await this.toastController.create({
      message: 'آیا از این اقدام مطمئن هستید؟',
      color: 'light',
      icon: 'close-circle',
      swipeGesture: 'vertical',
      buttons: [
        {
          text: 'انصراف',
          role: 'cancel',
        },
        {
          text: 'تایید',
          handler: options.handler,
        },
      ],
      ...this.defaultOptions,
      duration: 0,
      ...options.options,
    });
    await toast.present();
  }
}
