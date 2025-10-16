import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonText,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
  IonImg,
} from '@ionic/angular/standalone';
import { FormGroupType } from '@model/reactiveform.model';
import { AuthModel } from '@model/auth.model';
import { AuthService } from '@service/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorage } from '@db/local-storage.database';
import { SettingsService } from '@service/setting/settings.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonSpinner,
    IonIcon,
    IonButton,
    IonInput,
    IonText,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SignInPage implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private settingsService = inject(SettingsService);
  private navController = inject(NavController);
  loginForm = new FormGroup<FormGroupType<AuthModel.LoginForm>>({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    captcha_value: new FormControl(''),
  });
  showPassword = false;
  loading = false;
  logo = this.settingsService.settings()?.['logo'];
  title = this.settingsService.settings()?.['title'];

  constructor() {}

  ngOnInit() {}

  getControl(key: keyof AuthModel.LoginForm) {
    return this.loginForm.get(key) as FormControl;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.loading = true;
    const loginData: AuthModel.Login = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      // ...(this.showCaptcha && { captcha_key: this.captcha.captcha_key }),
      // ...(this.showCaptcha && { captcha_value: this.loginForm.value.captcha }),
    };
    this.authService
      .login(loginData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        if (response.success) {
          LocalStorage.set('access_token', response.result?.access as string);
          LocalStorage.set('refresh_token', response.result?.refresh as string);
          this.navController.navigateForward(['/dashboard']);
        }
        this.loading = false;
      });
  }
}
