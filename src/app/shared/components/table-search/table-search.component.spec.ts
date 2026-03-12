import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchComponent } from './table-search.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('TableSearchComponent', () => {
  let component: TableSearchComponent;
  let fixture: ComponentFixture<TableSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSearchComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty search initially', () => {
    expect(component.search()).toBe('');
  });

  it('should push value into subject when onSearch is called', () => {
    const nextSpy = spyOn(component.searchSub$, 'next');
    component.search.set('Aditya');
    component.onSearch();

    expect(nextSpy).toHaveBeenCalledWith('Aditya');
  });
});
