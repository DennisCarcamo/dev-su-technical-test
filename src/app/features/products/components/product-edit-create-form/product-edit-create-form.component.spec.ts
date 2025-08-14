/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/typedef */
import { ProductEditCreateFormComponent } from './product-edit-create-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';
import { FinancialProduct } from '../../models/financial-product.model';

describe('ProductEditCreateFormComponent', () => {
  let component: ProductEditCreateFormComponent;
  let mockFb: FormBuilder;
  let mockRoute: Partial<ActivatedRoute>;
  let mockDetector: jest.Mocked<ChangeDetectorRef>;
  let mockService: jest.Mocked<ProductsService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(() => {
    mockFb = new FormBuilder();
    mockRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn(),
          getAll: jest.fn(),
          has: jest.fn(),
          keys: [],
        },
        url: [],
        params: {},
        queryParams: {},
        fragment: null,
        data: {},
        outlet: '',
        component: null,
        routeConfig: null,
        root: new ActivatedRouteSnapshot(),
        parent: null,
        firstChild: null,
        children: [],
        pathFromRoot: [],
        queryParamMap: {
          get: jest.fn(),
          getAll: jest.fn(),
          has: jest.fn(),
          keys: [],
        } as unknown as import('@angular/router').ParamMap,
      },
    };
    mockDetector = {
      detectChanges: jest.fn(),
    } as unknown as jest.Mocked<ChangeDetectorRef>;
    mockService = {
      getProductById: jest.fn(),
      verifyProductExistence: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductsService>;
    mockRouter = { navigate: jest.fn() } as unknown as jest.Mocked<Router>;

    component = new ProductEditCreateFormComponent(
      mockFb,
      mockRoute as ActivatedRoute,
      mockDetector,
      mockService,
      mockRouter,
    );
  });

  it('should initialize new product form if no id param', () => {
    component.ngOnInit();
    expect(component.isEditMode).toBe(false);
    expect(component.registrationForm).toBeInstanceOf(FormGroup);
    expect(component.registrationForm.get('id')).toBeTruthy();
  });

  it('should initialize edit mode if id param exists', () => {
    if (!mockRoute.snapshot) {
      mockRoute.snapshot = {
        paramMap: new Map(),
      } as unknown as ActivatedRoute['snapshot'];
    }
    (mockRoute.snapshot.paramMap as any).has = jest.fn().mockReturnValue(true);
    (mockRoute.snapshot.paramMap as any).get = jest.fn().mockReturnValue('123');

    const product: FinancialProduct = {
      id: '123',
      name: 'Test',
      description: 'Test desc',
      logo: 'logo.png',
      dateRelease: new Date(),
      dateRevision: new Date(),
    };
    mockService.getProductById.mockReturnValue(of(product));

    component.ngOnInit();

    expect(component.isEditMode).toBe(true);
    expect(mockService.getProductById).toHaveBeenCalledWith('123');
  });

  it('should show success modal', () => {
    component.showSuccessMessage('Title', 'Message');
    expect(component.modalTitle).toBe('Title');
    expect(component.modalMessage).toBe('Message');
    expect(component.modalType).toBe('success');
    expect(component.isModalOpen).toBe(true);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should show error modal', () => {
    component.showErrorMessage('Error', 'Something went wrong');
    expect(component.modalTitle).toBe('Error');
    expect(component.modalMessage).toBe('Something went wrong');
    expect(component.modalType).toBe('error');
    expect(component.isModalOpen).toBe(true);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should reset form on onReset', () => {
    component.registrationForm = mockFb.group({
      name: ['Test'],
      description: ['Desc'],
      logo: ['logo.png'],
      releaseDate: [''],
      reviewDate: [''],
    });
    component.onReset();
    expect(component.registrationForm.value.name).toBe('');
    expect(component.registrationForm.value.description).toBe('');
  });

  it('should close modal on onCloseModal', () => {
    component.modalTitle = 'Title';
    component.modalMessage = 'Message';
    component.modalType = 'success';
    component.isModalOpen = true;

    component.onCloseModal();

    expect(component.modalTitle).toBe('');
    expect(component.modalMessage).toBe('');
    expect(component.modalType).toBe('');
    expect(component.isModalOpen).toBe(false);
    expect(mockDetector.detectChanges).toHaveBeenCalled();
  });

  it('should return true for hasError when control is touched and has error', () => {
    component.registrationForm = mockFb.group({
      name: [''],
    });
    const control = component.registrationForm.get('name');
    control?.setErrors({ required: true });
    control?.markAsTouched();

    expect(component.hasError('name', 'required')).toBe(true);
  });

  it('should return false for hasError when control not touched or no error', () => {
    component.registrationForm = mockFb.group({
      name: [''],
    });
    expect(component.hasError('name', 'required')).toBe(false);
  });
});
