import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';
import { provideZonelessChangeDetection } from '@angular/core';
import { Customer } from '../../../core/models/model';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;
  let mockCustomerData: Customer[];

  beforeEach(async () => {
    mockCustomerData = [
      {
        id: '1290fh23yf0238hf0238',
        name: 'Aditya',
        email: 'aditya@gmail.com',
        mobile: '9762893389',
        category: 'Food',
        amount: 5000,
        date: '2026-03-04',
        status: 'Completed',
      },
    ];
    await TestBed.configureTestingModule({
      imports: [DataTableComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    component.paginator = {
      page: {
        subscribe: jasmine.createSpy(),
      },
    } as any;

    component.sort = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update datasource when data input changes', () => {
    fixture.componentRef.setInput('data', mockCustomerData);
    fixture.detectChanges();
    expect(component.dataSource.data).toEqual(mockCustomerData);
  });

  it('should initialize datasource in ngOnInit', () => {
    fixture.componentRef.setInput('data', mockCustomerData);
    fixture.detectChanges();

    component.ngOnInit();
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should apply chart filter when chartFilter changes', () => {
    spyOn(component as any, 'onApplyFilters');

    fixture.componentRef.setInput('chartFilter', { status: 'Completed' });
    fixture.detectChanges();
    expect((component as any).onApplyFilters).toHaveBeenCalled();
  });

  it('should attach paginator when pagination is enabled', () => {
    spyOn(component as any, 'updatePageInfo');

    fixture.componentRef.setInput('enablePagination', true);
    fixture.detectChanges();

    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBeDefined();
    expect((component as any).updatePageInfo).toHaveBeenCalled();
  });

  it('should attach sort when sorting is enabled', () => {
    fixture.componentRef.setInput('enableSorting', true);
    fixture.detectChanges();

    component.ngAfterViewInit();

    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should update store filters on search', () => {
    spyOn(component.store, 'updateFilters');

    component.onSearch('Aditya');
    expect(component.store.updateFilters).toHaveBeenCalledWith({
      search: 'aditya',
    });
  });

  it('should merge filters and apply them', () => {
    component.filters = { status: 'Pending' };
    spyOn(component, 'applyFilters');

    component.onApplyFilters({ category: 'Food' });
    expect(component.filters).toEqual({
      status: 'Pending',
      category: 'Food',
    });
    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should apply filters to datasource and update store', () => {
    spyOn(component.store, 'updateFilters');
    component.filters = { status: 'Completed' };

    component.applyFilters();

    expect(component.dataSource.filter).toBe(JSON.stringify(component.filters));
    expect(component.store.updateFilters).toHaveBeenCalledWith({
      status: 'Completed',
    });
  });

  it('should reset all filters and update datasource', () => {
    spyOn(component.store, 'resetFilters');
    component.filters = {
      search: 'abc',
      status: 'Completed',
      category: 'Food',
      startDate: '2026-01-01',
      endDate: '2026-02-01',
    };

    component.resetFilters();

    expect(component.filters).toEqual({
      search: '',
      status: '',
      category: '',
      startDate: '',
      endDate: '',
    });
    expect(component.dataSource.filter).toBe(JSON.stringify(component.filters));
    expect(component.store.resetFilters).toHaveBeenCalled();
  });

  it('should call store deleteCustomer', () => {
    spyOn(component.store, 'deleteCustomer');
    component.deleteCustomer('123');
    expect(component.store.deleteCustomer).toHaveBeenCalledWith('123');
  });

  it('should match row when search text matches', () => {
    component.dataPredicate();
    const row: any = {
      name: 'Aditya',
      status: 'Completed',
      category: 'Food',
      date: '2026-03-04',
    };
    const filter = JSON.stringify({
      search: 'adi',
    });
    const result = component.dataSource.filterPredicate(row, filter);

    expect(result).toBeTrue();
  });

  it('should filter by status', () => {
    component.dataPredicate();
    const row: any = {
      name: 'Aditya',
      status: 'Completed',
      category: 'Food',
      date: '2026-03-04',
    };
    const filter = JSON.stringify({
      status: 'Completed',
    });

    const result = component.dataSource.filterPredicate(row, filter);

    expect(result).toBeTrue();
  });

  it('should return false when category does not match', () => {
    component.dataPredicate();

    const row: any = {
      name: 'Aditya',
      status: 'Completed',
      category: 'Food',
      date: '2026-03-04',
    };

    const filter = JSON.stringify({
      category: 'Travel',
    });

    const result = component.dataSource.filterPredicate(row, filter);
    expect(result).toBeFalse();
  });

  it('should filter by startDate', () => {
    component.dataPredicate();

    const row: any = {
      name: 'Aditya',
      status: 'Completed',
      category: 'Food',
      date: '2026-03-10',
    };
    const filter = JSON.stringify({
      startDate: '2026-03-01',
    });

    const result = component.dataSource.filterPredicate(row, filter);
    expect(result).toBeTrue();
  });

  it('should ignore empty filter values', () => {
    component.dataPredicate();

    const row: any = {
      name: 'Aditya',
      status: 'Completed',
      category: 'Food',
      date: '2026-03-04',
    };
    const filter = JSON.stringify({
      status: '',
    });
    const result = component.dataSource.filterPredicate(row, filter);

    expect(result).toBeTrue();
  });

  it('should calculate pagination indexes correctly', () => {
    component.paginator = {
      pageIndex: 1,
      pageSize: 10,
    } as any;

    component.dataSource.filteredData = new Array(25);
    component.updatePageInfo();

    expect(component.startIndex()).toBe(11);
    expect(component.endIndex()).toBe(20);
  });

  it('should emit addNewCustomerEvent when modal opens', () => {
    spyOn(component.addNewCustomerEvent, 'emit');
    component.openCustomerModal();
    expect(component.addNewCustomerEvent.emit).toHaveBeenCalled();
  });
});
