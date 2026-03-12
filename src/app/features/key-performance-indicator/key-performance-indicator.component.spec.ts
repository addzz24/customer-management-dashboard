import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPerformanceIndicatorComponent } from './key-performance-indicator.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { GlobalStore } from '../../store/global/global.store';

describe('KeyPerformanceIndicator', () => {
  let component: KeyPerformanceIndicatorComponent;
  let fixture: ComponentFixture<KeyPerformanceIndicatorComponent>;

  let mockStore: any;

  beforeEach(async () => {
    mockStore = {
      totalCustomers: jasmine.createSpy().and.returnValue(10),
      totalSpend: jasmine.createSpy().and.returnValue(5000),
      completedOrders: jasmine.createSpy().and.returnValue(6),
      pendingOrders: jasmine.createSpy().and.returnValue(4),
    };

    await TestBed.configureTestingModule({
      imports: [KeyPerformanceIndicatorComponent],
      providers: [provideZonelessChangeDetection(), { provide: GlobalStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(KeyPerformanceIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate KPI indicators correctly on updatePerformanceIndicators() ', () => {
    component.updatePerformanceIndicators();
    expect(component.performanceIndicators.length).toBe(4);

    const customers = component.performanceIndicators[0];
    const spend = component.performanceIndicators[1];
    const completed = component.performanceIndicators[2];
    const pending = component.performanceIndicators[3];

    expect(customers.name).toBe('Customers');
    expect(customers.value).toBe(10);

    expect(spend.name).toBe('Spend');
    expect(spend.value).toBe('5000 ₹');

    expect(completed.value).toBe(6);
    expect(pending.value).toBe(4);
  });

  it('should calculate correct order trend percentage', () => {
    component.updatePerformanceIndicators();
    const completedIndicator = component.performanceIndicators[2];
    expect(completedIndicator.trend).toBe(60);
  });

  it('should handle zero orders safely', () => {
    mockStore.completedOrders.and.returnValue(0);
    mockStore.pendingOrders.and.returnValue(0);
    component.updatePerformanceIndicators();
    const completedIndicator = component.performanceIndicators[2];
    expect(completedIndicator.trend).toBe(0);
  });

  it('should handle when all store values are zero', () => {
    mockStore.totalCustomers.and.returnValue(0);
    mockStore.totalSpend.and.returnValue(0);
    mockStore.completedOrders.and.returnValue(0);
    mockStore.pendingOrders.and.returnValue(0);

    component.updatePerformanceIndicators();

    expect(component.performanceIndicators.length).toBe(4);

    const completed = component.performanceIndicators[2];
    const pending = component.performanceIndicators[3];

    expect(completed.trend).toBe(0);
    expect(pending.trend).toBe(0);
  });
});
