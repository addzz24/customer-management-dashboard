import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComponent } from './analytics.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { GlobalStore } from '../../store/global/global.store';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let mockStore: any;
  let mockSpendByCategoryValue;
  let mockSpendByStatusValue;
  let mockSpendByDateValue;

  beforeEach(async () => {
    mockSpendByCategoryValue = { category: 'Food', amount: 200 };
    mockSpendByStatusValue = { status: 'Completed', amount: 500 };
    mockSpendByDateValue = { date: '2026-03-01', amount: 100 };
    mockStore = {
      spendByCategory: jasmine.createSpy().and.returnValue([mockSpendByCategoryValue]),
      spendByStatus: jasmine.createSpy().and.returnValue([mockSpendByStatusValue]),
      spendTrendByDate: jasmine.createSpy().and.returnValue([mockSpendByDateValue]),
    };

    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
      providers: [provideZonelessChangeDetection(), { provide: GlobalStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get spend by category from store', () => {
    const result = component.spendByCategory();
    expect(result.length).toBe(1);
    expect(mockStore.spendByCategory).toHaveBeenCalled();
  });

  it('should get spend by status from store', () => {
    const result = component.spendByStatus();
    expect(result.length).toBe(1);
    expect(mockStore.spendByStatus).toHaveBeenCalled();
  });

  it('should get spend trend data from store', () => {
    const result = component.spendTrendByDate();
    expect(result.length).toBe(1);
    expect(mockStore.spendTrendByDate).toHaveBeenCalled();
  });

  it('should emit status filter', () => {
    spyOn(component.currentFilter, 'emit');
    component.onStatusFilter('Completed');
    expect(component.currentFilter.emit).toHaveBeenCalledWith({
      status: 'Completed',
    });
  });

  it('should emit category filter', () => {
    spyOn(component.currentFilter, 'emit');
    component.onCategoryFilter('Food');
    expect(component.currentFilter.emit).toHaveBeenCalledWith({
      category: 'Food',
    });
  });

  it('should emit date filter', () => {
    spyOn(component.currentFilter, 'emit');
    component.onDateFilter('2026-03-01');
    expect(component.currentFilter.emit).toHaveBeenCalledWith({
      startDate: '2026-03-01',
    });
  });

});
