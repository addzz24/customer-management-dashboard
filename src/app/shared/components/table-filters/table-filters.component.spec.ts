import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFiltersComponent } from './table-filters.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TableFiltersComponent', () => {
  let component: TableFiltersComponent;
  let fixture: ComponentFixture<TableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableFiltersComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize filters as empty object', () => {
    expect(component.filters).toEqual({});
  });

  it('should emit filters when applyFilters is called', () => {
    spyOn(component.apply, 'emit');

    component.filters = { status: 'Completed' };
    component.applyFilters();

    expect(component.apply.emit).toHaveBeenCalledWith({
      status: 'Completed',
    } as any);
  });

  it('should reset filters and emit reset event', () => {
    spyOn(component.reset, 'emit');

    component.filters = { status: 'Completed' };
    component.resetFilters();

    expect(component.filters).toEqual({});
    expect(component.reset.emit).toHaveBeenCalled();
  });
});
