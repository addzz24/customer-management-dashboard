import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Customer } from '../../core/models/model';
import { FORM_VALIDATION_MESSAGES } from '../../shared/constants/constants';

@Component({
  selector: 'app-customer-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIcon,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
})
export class CustomerFormComponent implements OnInit {

  /**
   * DESCRIPTION :
   * - Component provides form for adding new customer in data table
   * - Using reactive forms
   * - On submit updating the customer store to show data in data table
   */
  ngOnInit(): void {}

  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CustomerFormComponent>);

  customerForm = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    mobile: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    category: this.fb.nonNullable.control('', Validators.required),
    amount: this.fb.nonNullable.control(0, Validators.required),
    date: this.fb.nonNullable.control('', Validators.required),
    status: this.fb.nonNullable.control('', Validators.required),
  });

  submit() {
    if (this.customerForm.invalid) {
      this.customerForm.markAllAsTouched();
      return;
    }
    const customer: Customer = {
      id: crypto.randomUUID(),
      ...this.customerForm.getRawValue(),
    } as Customer;
    this.dialogRef.close(customer);
  }

  close() {
    this.dialogRef.close();
  }

  getError(controlName: keyof typeof this.customerForm.controls): string {
    const control = this.customerForm.controls[controlName];

    if (!control.touched || !control.errors) return '';

    if (control.errors['required']) {
      return FORM_VALIDATION_MESSAGES.REQUIRED[controlName] || 'Field is required';
    }

    if (control.errors['email']) {
      return FORM_VALIDATION_MESSAGES.EMAIL_INVALID;
    }

    if (control.errors['minlength']) {
      return FORM_VALIDATION_MESSAGES.MIN_LENGTH[controlName as keyof typeof FORM_VALIDATION_MESSAGES.MIN_LENGTH] || '';
    }

    return '';
  }
}
