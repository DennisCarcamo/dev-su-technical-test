/* eslint-disable @typescript-eslint/unbound-method */
import { ProductsListPageComponent } from './products-list-page.component';
import { ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { of, throwError } from 'rxjs';
import { FinancialProduct } from '../../models/financial-product.model';

describe('ProductsListPageComponent', () => {
  let component: ProductsListPageComponent;
  let mockProductsService: jest.Mocked<ProductsService>;
  let mockDetector: jest.Mocked<ChangeDetectorRef>;

  beforeEach(() => {
    mockProductsService = {
      getProducts: jest.fn(),
      getProductById: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;

    mockDetector = {
      detectChanges: jest.fn(),
    } as unknown as jest.Mocked<ChangeDetectorRef>;

    component = new ProductsListPageComponent(
      mockProductsService,
      mockDetector,
    );
  });

  it('should load products on init', (): void => {
    const products: FinancialProduct[] = [
      { id: '1', name: 'Prod 1' } as FinancialProduct,
    ];
    mockProductsService.getProducts.mockReturnValue(of(products));

    component.ngOnInit();

    expect(mockProductsService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(products);
    expect(component.isLoadingProducts).toBe(false);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should set error modal when search fails', () => {
    mockProductsService.getProductById.mockReturnValue(
      throwError(() => new Error('not found')),
    );

    component.onSearchTermChange('123');

    expect(mockProductsService.getProductById).toHaveBeenCalledWith('123');
    // Because of async subscribe, we need to flush microtasks
    setImmediate(() => {
      expect(component.products).toEqual([]);
      expect(component.isModalOpen).toBe(true);
      expect(component.modalTitle).toBe('Error');
      expect(component.modalMessage).toBe(
        'No se encontró el producto con ese ID.',
      );
      expect(component.modalType).toBe('error');
      expect(mockDetector.detectChanges).toHaveBeenCalled();
    });
  });

  it('should set confirmation modal on onDeleteProduct', () => {
    component.onDeleteProduct('321');
    expect(component.confirmationProductId).toBe('321');
    expect(component.confirmationModalTitle).toBe('Confirmar eliminación');
    expect(component.confirmationModalMessage).toBe(
      '¿Estás seguro de que deseas eliminar este producto?',
    );
    expect(component.confirmationModalType).toBe('warning');
    expect(component.isConfirmationMsModalOpen).toBe(true);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should reset and close modal on onCloseModal', () => {
    component.isModalOpen = true;
    component.onCloseModal();
    expect(component.isModalOpen).toBe(false);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should reset and close confirmation modal on onCloseConfirmationModal', () => {
    component.isConfirmationMsModalOpen = true;
    component.onCloseConfirmationModal();
    expect(component.isConfirmationMsModalOpen).toBe(false);
    expect(component.confirmationModalTitle).toBe('');
    expect(component.confirmationModalMessage).toBe('');
    expect(component.confirmationModalType).toBe('success');
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should call deleteProduct and reload on onConfirmDeleteProduct', () => {
    mockProductsService.deleteProduct.mockReturnValue(of(''));
    mockProductsService.getProducts.mockReturnValue(of([]));

    component.onConfirmDeleteProduct('123');

    expect(mockProductsService.deleteProduct).toHaveBeenCalledWith('123');
    expect(mockProductsService.getProducts).toHaveBeenCalled();
    expect(component.isConfirmationMsModalOpen).toBe(false);
    expect(component.confirmationModalTitle).toBe('');
    expect(component.confirmationModalMessage).toBe('');
    expect(component.confirmationModalType).toBe('success');
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should reset confirmation modal on onCancelDeleteProduct', () => {
    component.isConfirmationMsModalOpen = true;
    component.onCancelDeleteProduct();
    expect(component.isConfirmationMsModalOpen).toBe(false);
    expect(component.confirmationModalTitle).toBe('');
    expect(component.confirmationModalMessage).toBe('');
    expect(component.confirmationModalType).toBe('success');
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });
});
