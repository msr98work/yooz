import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
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
  IonInputOtp,
} from '@ionic/angular/standalone';
import { FormGroupType } from '@model/reactiveform.model';
import { AuthService } from '@service/auth/auth.service';
import { NavController } from '@ionic/angular';
import { AuthModel } from '@model/auth.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorage } from '@db/local-storage.database';
import { InputPasswordComponent } from 'src/app/components/widgets/input/input-password/input-password.component';
import { InputTextComponent } from 'src/app/components/widgets/input/input-text/input-text.component';

type Mode = 'otp' | 'password';
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
    IonText,
    IonContent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonInputOtp,
    InputPasswordComponent,
    InputTextComponent,
  ],
})
export class SignInPage implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  // private settingsService = inject(SettingsService);
  private navController = inject(NavController);
  loginForm = new FormGroup<FormGroupType<AuthModel.SignIn>>({
    username: new FormControl('', Validators.required),
    password: new FormControl(''),
    otp: new FormControl(''),
  });
  showPassword = false;
  loading = false;
  logo = 'assets/icon/logo1.png';
  title = 'سامانه موبایل gis';
  mode: Mode = 'password';
  isSendCode = false;
  timer: string;

  constructor() {}

  ngOnInit() {
    this.changeMode();
  }

  getControl(key: keyof AuthModel.SignIn) {
    return this.loginForm.get(key) as FormControl;
  }

  changeMode(mode: Mode = 'password') {
    this.loginForm.reset();
    if (mode == 'password') {
      this.getControl('password').addValidators(Validators.required);
      this.getControl('otp').clearValidators();
      this.getControl('otp').updateValueAndValidity();
    } else if (mode == 'otp') {
      this.isSendCode = false;
      this.getControl('otp').addValidators(this.otpRequiredLength(5));
      this.getControl('password').clearValidators();
      this.getControl('password').updateValueAndValidity();
    }
    this.mode = mode;
  }

  otpRequiredLength(length: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value || value.toString().length !== length) {
        return { otpLength: true };
      }
      return null;
    };
  }

  startTimer() {
    this.isSendCode = true;
    let timer = 2 * 60,
      minutes,
      seconds;
    const intervalCount = setInterval(() => {
      minutes = parseInt(String(timer / 60), 10);
      seconds = parseInt(String(timer % 60), 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      this.timer = minutes + ':' + seconds;
      if (timer-- <= 0) {
        this.isSendCode = false;
        timer = 0;
        clearInterval(intervalCount);
      }
    }, 1000);
  }

  getCode() {
    this.loading = false;
    this.startTimer();
  }

  onSubmit() {
    this.loading = true;
    const loginData: AuthModel.SignIn = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      // ...(this.showCaptcha && { captcha_key: this.captcha.captcha_key }),
      // ...(this.showCaptcha && { captcha_value: this.loginForm.value.captcha }),
    };
    this.authService
      .signIn(loginData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response) => {
        if (response.success) {
          LocalStorage.set('access_token', response.result.access_token);
          // LocalStorage.set('refresh_token', response.result?.refresh as string);
          this.navController.navigateForward(['/dashboard']);
        }
        this.loading = false;
      });
  }
}
