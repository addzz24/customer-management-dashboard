import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { GlobalStore } from '../../store/global/global.store';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../../core/models/model';

/**
 * Following test cases are covered :
 * Component creation
 * Loading initial data on ngOnInit()
 *
 */

describe('Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockStore: any;
  let mockDialog: any;
  let mockFormData: Customer;
  beforeEach(async () => {

    mockFormData = {
      id: '1290fh23yf0238hf0238',
      name: 'Aditya',
      email: 'aditya@gmail.com',
      mobile: '9762893389',
      category: 'Food',
      amount: 5000,
      date: '2026-03-04',
      status: 'Completed'
    };

    mockStore = {
      loadCustomers: jasmine.createSpy(),
      addCustomer: jasmine.createSpy(),
      filteredCustomers: jasmine.createSpy().and.returnValue([]),
      totalCustomers: jasmine.createSpy().and.returnValue(0),
      totalSpend: jasmine.createSpy().and.returnValue(0),
      completedOrders: jasmine.createSpy().and.returnValue(0),
      pendingOrders: jasmine.createSpy().and.returnValue(0),
      spendTrendByDate: jasmine.createSpy().and.returnValue([]),
      spendByCategory: jasmine.createSpy().and.returnValue([]),
      spendByStatus: jasmine.createSpy().and.returnValue([]),
    };

    mockDialog = {
      open: jasmine.createSpy().and.returnValue({
        afterClosed: () => of(mockFormData),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: GlobalStore, useValue: mockStore },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize feature flags as true', () => {
    expect(component.enablePagination()).toBeTrue();
    expect(component.enableSorting()).toBeTrue();
    expect(component.enableSearch()).toBeTrue();
    expect(component.enableFilters()).toBeTrue();
  });

  it('should load customers on init', () => {
    component.ngOnInit();
    expect(mockStore.loadCustomers).toHaveBeenCalled();
  });

  it('should sync customers from store filteredCustomers', () => {
    mockStore.filteredCustomers.and.returnValue([{ name: 'A' }]);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component.customers.length).toBe(1);
  });

  it('should open customer modal and add customer after close', () => {
    component.openCustomerModal();
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockStore.addCustomer).toHaveBeenCalledWith(mockFormData);
  });

  it('should NOT add customer when dialog returns null', () => {
    mockDialog.open.and.returnValue({
      afterClosed: () => of(null),
    });
    component.openCustomerModal();
    expect(mockStore.addCustomer).not.toHaveBeenCalled();
  });

  it('should update chart filter', () => {
    component.setChartFilter('Completed');
    expect(component.chartFilter()).toBe('Completed');
  });

  it('should allow chart filter to be null', () => {
    component.setChartFilter(null);
    expect(component.chartFilter()).toBeNull();
  });
});
