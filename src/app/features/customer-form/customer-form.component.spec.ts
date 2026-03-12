import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFormComponent } from './customer-form.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { Customer } from '../../core/models/model';
import { of } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let mockDialog: any;
  let mockFormData: Customer;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockFormData = {
      id: '1290fh23yf0238hf0238',
      name: 'Aditya',
      email: 'aditya@gmail.com',
      mobile: '9762893389',
      category: 'Food',
      amount: 5000,
      date: '2026-03-04',
      status: 'Completed',
    };

    mockDialog = {
      open: jasmine.createSpy().and.returnValue({
        afterClosed: () => of(mockFormData),
      }),
    };

    mockDialogRef = {
      close: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [CustomerFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as touched when submitting invalid form', () => {
    spyOn(component.customerForm, 'markAllAsTouched');

    component.submit();

    expect(component.customerForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should close dialog with customer when form is valid', () => {
    component.customerForm.patchValue(mockFormData);
    component.submit();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog when close() is called', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should return required error message', () => {
    const control = component.customerForm.controls['name'];
    control.markAsTouched();
    control.setErrors({ required: true });
    const error = component.getError('name');
    expect(error).toContain('required');
  });
});
