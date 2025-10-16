import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserProfilePage implements OnInit {
  currentStep = 1;
  totalSteps = 4;

  wizardForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.wizardForm = this.fb.group({
      step1: this.fb.group({
        projectName: ['', Validators.required],
        projectType: ['', Validators.required],
      }),
      step2: this.fb.group({
        budget: ['', Validators.required],
        timeline: ['', Validators.required],
      }),
      step3: this.fb.group({
        contactName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      step4: this.fb.group({
        agreement: [false, Validators.requiredTrue],
      }),
    });
  }

  get step1(): FormGroup {
    return this.wizardForm.get('step1') as FormGroup;
  }
  get step2(): FormGroup {
    return this.wizardForm.get('step2') as FormGroup;
  }
  get step3(): FormGroup {
    return this.wizardForm.get('step3') as FormGroup;
  }
  get step4(): FormGroup {
    return this.wizardForm.get('step4') as FormGroup;
  }

  get progressPercentage(): number {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  nextStep(): void {
    if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  private validateCurrentStep(): boolean {
    const stepGroup = this.wizardForm.get(
      `step${this.currentStep}`
    ) as FormGroup;
    return stepGroup.valid;
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    const stepGroup = this.wizardForm.get(`step${step}`) as FormGroup;
    return stepGroup.valid && step < this.currentStep;
  }

  onSubmit(): void {
    if (this.wizardForm.valid) {
      console.log('Form Data:', this.wizardForm.value);
      // Submit logic here
      alert('پروژه با موفقیت ایجاد شد!');
    }
  }

  getStepStatus(step: number): string {
    if (this.isStepActive(step)) return 'active';
    if (this.isStepCompleted(step)) return 'completed';
    return 'pending';
  }
  ngOnInit() {}
}
