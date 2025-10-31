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
import { PasswordValidators } from '@util/password-validators';
import { UserService } from '@service/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from '@service/message/message.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
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
    IonInputOtp,
  ],
})
export class SignUpPage implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private navController = inject(NavController);
  loginForm = new FormGroup<FormGroupType<AuthModel.SignUp>>(
    {
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', [Validators.pattern(/^09[0-9]{9}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('male'),
      code: new FormControl(''),
    },
    {
      validators: PasswordValidators.match('password', 'confirm_password'),
    }
  );
  showPassword = false;
  loading = false;
  logo = 'assets/icon/logo.png';
  title = 'سامانه حضور و غیاب';
  isSendCode = false;
  timer: string;

  constructor() {}

  ngOnInit() {}

  getControl(key: keyof AuthModel.SignUp) {
    return this.loginForm.get(key) as FormControl;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
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

  onSubmit() {
    this.loading = true;
    if (!this.isSendCode) {
      this.authService
        .sendEmail({
          email: this.loginForm.value.email,
        })
        .subscribe((data) => {
          if (data.success) {
            this.messageService.success({
              message: 'کد با موفقیت ارسال شد.',
            });
            this.isSendCode = true;
            this.startTimer();
          }
          this.loading = false;
        });
    } else {
      this.userService
        .post(this.loginForm.value as AuthModel.SignUp)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((response) => {
          if (response.success) {
            this.messageService.success({
              message: 'کاربر با موفقیت ساخته شد.',
            });

            this.navController.navigateForward(['/sign-in']);
          }
          this.loading = false;
        });
    }
  }
}
