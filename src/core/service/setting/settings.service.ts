import { Injectable, inject, signal } from '@angular/core';
import { SettingModel } from '@model/setting.model';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // private translateService = inject(TranslateService);
  // private responsiveService = inject(ResponsiveService);
  private settingService = inject(SettingService);
  // private dialogService = inject(DialogService);
  settings = signal<SettingModel.Settings>(null);

  // setLanguage(localId: string) {
  //   const direction = localId === 'en' ? 'ltr' : 'rtl';
  //   this.responsiveService.position.set(direction == 'ltr' ? 'left' : 'right');
  //   document.documentElement.lang = localId ?? 'fa';
  //   document.documentElement.dir = direction;
  //   this.translateService.use(localId ?? 'fa');
  // }

  // getDirection() {
  //   this.responsiveService.position();
  // }

  initialize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.settingService.getSetting().subscribe((response: any) => {
        if (response.success) {
          this.settings.set(
            Object.fromEntries(
              response.result.map((item) => [item.key, item.value])
            )
          );

          // document.getElementById('drilling-title').innerText =
          //   this.settings()['title'];
          // document.getElementById('drilling-favicon')['href'] =
          //   this.settings()['logo'];
          // this.setLanguage(this.settings['app_language'] || 'fa');

          resolve(true);
        }
      });
      // resolve(true);
    });
  }
}
