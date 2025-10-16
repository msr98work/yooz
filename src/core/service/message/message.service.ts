import { inject, Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private toastController = inject(ToastController);

  defaultOptions: ToastOptions = {
    duration: 3000,
    position: 'top',
    animated: true,
    layout: 'stacked',
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
}
