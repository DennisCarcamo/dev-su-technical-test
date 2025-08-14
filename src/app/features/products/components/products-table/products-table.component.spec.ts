/* eslint-disable @typescript-eslint/unbound-method */
import { ProductsTableComponent } from './products-table.component';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FinancialProduct } from '../../models/financial-product.model';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let mockDetector: jest.Mocked<ChangeDetectorRef>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockDetector = {
      detectChanges: jest.fn(),
    } as unknown as jest.Mocked<ChangeDetectorRef>;
    mockRouter = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    component = new ProductsTableComponent(mockDetector, mockRouter);
  });

  it('should set pageSize to products length on init', () => {
    component.products = [
      { id: '1', name: 'Test Product' } as FinancialProduct,
    ];
    component.ngOnInit();
    expect(component.pageSize).toBe(1);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should emit searchTermChange when searchTerm is set', () => {
    const emitSpy: jest.SpyInstance = jest.spyOn(
      component.searchTermChange,
      'emit',
    );
    component.searchTerm = 'abc';
    component.onSearch();
    expect(emitSpy).toHaveBeenCalledWith('abc');
  });

  it('should show error modal when searchTerm is empty', () => {
    component.searchTerm = '';
    component.onSearch();
    expect(component.isModalOpen).toBe(true);
    expect(component.modalType).toBe('error');
    expect(component.modalTitle).toBe('Error de búsqueda');
    expect(component.modalMessage).toBe(
      'Por favor, verifica el criterio de búsqueda.',
    );
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should close modal on onCloseModal', () => {
    component.isModalOpen = true;
    component.onCloseModal();
    expect(component.isModalOpen).toBe(false);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should navigate to create product on onAdd', () => {
    component.onAdd();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/create']);
  });

  it('should update products on onPageSizeChange', () => {
    component.products = [
      { id: '1', name: 'A' } as FinancialProduct,
      { id: '2', name: 'B' } as FinancialProduct,
    ];
    component.pageSize = 1;

    component.onPageSizeChange();

    expect(component.products.length).toBe(1);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should emit delete event with productId', () => {
    const emitSpy: jest.SpyInstance = jest.spyOn(
      component.emitDeleteProduct,
      'emit',
    );
    component.onDelete('123');
    expect(emitSpy).toHaveBeenCalledWith('123');
  });

  it('should navigate to edit product on onEdit', () => {
    component.onEdit('321');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/edit', '321']);
  });
});
