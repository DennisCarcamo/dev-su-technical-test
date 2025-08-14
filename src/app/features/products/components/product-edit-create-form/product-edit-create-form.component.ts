import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import {
  FinancialProduct,
  toFinancialProductDto,
} from '../../models/financial-product.model';
import { catchError, of, take } from 'rxjs';
import { ModalType } from 'src/app/shared/types/modal-types';
import { iso8601FutureDateValidator } from 'src/app/shared/validators/iso8601-future-date.validator';

@Component({
  selector: 'app-product-edit-create-form',
  templateUrl: './product-edit-create-form.component.html',
  styleUrls: ['./product-edit-create-form.component.css'],
})
export class ProductEditCreateFormComponent implements OnInit {
  public registrationForm!: FormGroup;
  public isEditMode: boolean = false;

  public modalTitle: string = '';
  public modalMessage: string = '';
  public isModalOpen: boolean = false;
  public modalType: ModalType = 'success';

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly detection: ChangeDetectorRef,
    private readonly productService: ProductsService,
    private readonly router: Router,
  ) {
    // empty
  }

  public ngOnInit(): void {
    this.verifyFormMode();
  }

  public verifyFormMode(): void {
    this.isEditMode = this.route.snapshot.paramMap.has('id');
    if (this.isEditMode) {
      this.initializeEditProductFormMode();
    } else {
      this.initializeNewProductFormMode();
    }
  }

  public initializeEditProductFormMode(): void {
    const productId: string | null = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService
        .getProductById(productId)
        .pipe(take(1))
        .subscribe((product: FinancialProduct | null) => {
          if (product) {
            this.registrationForm = this.fb.group({
              id: [product.id],
              name: [
                product.name,
                [
                  (control: AbstractControl): ValidationErrors | null =>
                    Validators.required(control),
                  (control: AbstractControl): ValidationErrors | null => {
                    const value: string = control.value as string;

                    if (typeof value !== 'string') {
                      return { invalidType: true };
                    }

                    const trimmedLength: number = value.trim().length;

                    if (trimmedLength < 5) {
                      return {
                        minlength: {
                          requiredLength: 5,
                          actualLength: trimmedLength,
                        },
                      };
                    }

                    if (trimmedLength > 100) {
                      return {
                        maxlength: {
                          requiredLength: 100,
                          actualLength: trimmedLength,
                        },
                      };
                    }

                    return null;
                  },
                ],
              ],
              description: [
                product.description,
                [
                  (control: AbstractControl): ValidationErrors | null =>
                    Validators.required(control),
                  (control: AbstractControl): ValidationErrors | null => {
                    const value: string = control.value as string;

                    if (typeof value !== 'string') {
                      return { invalidType: true };
                    }

                    const trimmedLength: number = value.trim().length;

                    if (trimmedLength < 10) {
                      return {
                        minlength: {
                          requiredLength: 10,
                          actualLength: trimmedLength,
                        },
                      };
                    }

                    if (trimmedLength > 200) {
                      return {
                        maxlength: {
                          requiredLength: 200,
                          actualLength: trimmedLength,
                        },
                      };
                    }

                    return null;
                  },
                ],
              ],
              logo: [
                product.logo,
                [
                  (control: AbstractControl): ValidationErrors | null =>
                    Validators.required(control),
                ],
              ],
              releaseDate: [
                product.dateRelease,
                (control: AbstractControl): ValidationErrors | null =>
                  Validators.required(control),
              ],
              reviewDate: [
                product.dateRevision,
                (control: AbstractControl): ValidationErrors | null =>
                  Validators.required(control),
              ],
            });
          }
        });
    }
  }

  public initializeNewProductFormMode(): void {
    this.registrationForm = this.fb.group({
      id: [
        '',
        [
          (control: AbstractControl): ValidationErrors | null =>
            Validators.required(control),
          (control: AbstractControl): ValidationErrors | null => {
            const value: string = control.value as string;

            if (typeof value !== 'string') {
              return { invalidType: true };
            }

            const trimmedLength: number = value.trim().length;

            if (trimmedLength < 3) {
              return {
                minlength: {
                  requiredLength: 3,
                  actualLength: trimmedLength,
                },
              };
            }

            if (trimmedLength > 10) {
              return {
                maxlength: {
                  requiredLength: 10,
                  actualLength: trimmedLength,
                },
              };
            }

            return null;
          },
        ],
      ],
      name: [
        '',
        [
          (control: AbstractControl): ValidationErrors | null =>
            Validators.required(control),
          (control: AbstractControl): ValidationErrors | null => {
            const value: string = control.value as string;

            if (typeof value !== 'string') {
              return { invalidType: true };
            }

            const trimmedLength: number = value.trim().length;

            if (trimmedLength < 5) {
              return {
                minlength: {
                  requiredLength: 5,
                  actualLength: trimmedLength,
                },
              };
            }

            if (trimmedLength > 100) {
              return {
                maxlength: {
                  requiredLength: 100,
                  actualLength: trimmedLength,
                },
              };
            }

            return null;
          },
        ],
      ],
      description: [
        '',
        [
          (control: AbstractControl): ValidationErrors | null =>
            Validators.required(control),
          (control: AbstractControl): ValidationErrors | null => {
            const value: string = control.value as string;

            if (typeof value !== 'string') {
              return { invalidType: true };
            }

            const trimmedLength: number = value.trim().length;

            if (trimmedLength < 10) {
              return {
                minlength: {
                  requiredLength: 10,
                  actualLength: trimmedLength,
                },
              };
            }

            if (trimmedLength > 200) {
              return {
                maxlength: {
                  requiredLength: 200,
                  actualLength: trimmedLength,
                },
              };
            }

            return null;
          },
        ],
      ],
      logo: [
        '',
        [
          (control: AbstractControl): ValidationErrors | null =>
            Validators.required(control),
        ],
      ],
      releaseDate: [
        '',
        [
          (control: AbstractControl): ValidationErrors | null =>
            Validators.required(control),
          iso8601FutureDateValidator,
        ],
      ],
      reviewDate: [
        '',
        [
          (control: AbstractControl): ValidationErrors | null =>
            Validators.required(control),
          iso8601FutureDateValidator,
        ],
      ],
    });
  }

  public onSubmit(): void {
    const newProduct: FinancialProduct = {
      id: String(this.registrationForm.get('id')?.value ?? ''),
      name: String(this.registrationForm.get('name')?.value ?? ''),
      description: String(
        this.registrationForm.get('description')?.value ?? '',
      ),
      logo: String(this.registrationForm.get('logo')?.value ?? ''),
      dateRelease: new Date(
        String(this.registrationForm.get('releaseDate')?.value ?? ''),
      ),
      dateRevision: new Date(
        String(this.registrationForm.get('reviewDate')?.value ?? ''),
      ),
    };

    if (!this.isEditMode && this.registrationForm.valid) {
      // if is not Edit mode, means will save a new one
      this.productService
        .verifyProductExistence(newProduct.id)
        .pipe(take(1))
        .subscribe((exists: boolean) => {
          if (exists) {
            this.showErrorMessage('Error', 'Este producto ya existe');
          } else {
            this.productService
              .createProduct(toFinancialProductDto(newProduct))
              .pipe(
                take(1),
                // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-unused-vars
                catchError((_err) => {
                  this.showErrorMessage(
                    'Error',
                    'Error al crear el producto, intente nuevamente',
                  );
                  return of(null);
                }),
              )
              .subscribe((createdProduct: FinancialProduct | null) => {
                if (createdProduct) {
                  this.showSuccessMessage(
                    'Operación exitosa',
                    'Producto creado con éxito',
                  );
                  setTimeout(() => {
                    void this.router.navigate(['/products']);
                  }, 3000);
                }
              });
          }
        });
    } else if (this.isEditMode && this.registrationForm.valid) {
      this.productService
        .updateProduct(toFinancialProductDto(newProduct))
        .pipe(
          take(1),
          // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-unused-vars
          catchError((_err) => {
            this.showErrorMessage('Error', 'Error al actualizar el producto');
            return of(null);
          }),
        )
        .subscribe((updatedProduct: FinancialProduct | null) => {
          if (updatedProduct) {
            this.showSuccessMessage(
              'Operación exitosa',
              'Producto actualizado con éxito',
            );
            setTimeout(() => {
              void this.router.navigate(['/products']);
            }, 3000);
          }
        });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  public showSuccessMessage(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'success';
    this.isModalOpen = true;
    this.detection.detectChanges();
  }

  public showErrorMessage(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'error';
    this.isModalOpen = true;
    this.detection.detectChanges();
  }

  public onReset(): void {
    this.registrationForm.reset({
      name: '',
      description: '',
      logo: '',
      releaseDate: '',
      reviewDate: '',
    });
  }

  public hasError(controlName: string, error: string): boolean {
    const control: AbstractControl | null =
      this.registrationForm.get(controlName);
    return !!(control && control.touched && control.hasError(error));
  }

  public onCloseModal(): void {
    this.modalTitle = '';
    this.modalMessage = '';
    this.modalType = '';
    this.isModalOpen = false;
    this.detection.detectChanges();
  }
}
