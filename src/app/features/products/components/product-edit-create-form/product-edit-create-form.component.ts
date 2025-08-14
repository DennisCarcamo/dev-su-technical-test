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
  FinancialProductDto,
  toFinancialProduct,
} from '../../models/financial-product.model';
import { catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-product-edit-create-form',
  templateUrl: './product-edit-create-form.component.html',
  styleUrls: ['./product-edit-create-form.component.css'],
})
export class ProductEditCreateFormComponent implements OnInit {
  public registrationForm!: FormGroup;
  public isEditMode: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly detector: ChangeDetectorRef,
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
        (control: AbstractControl): ValidationErrors | null =>
          Validators.required(control),
      ],
      reviewDate: [
        '',
        (control: AbstractControl): ValidationErrors | null =>
          Validators.required(control),
      ],
    });
  }

  public onSubmit(): void {
    const newProduct: FinancialProductDto = this.registrationForm
      .value as FinancialProductDto;

    if (!this.isEditMode && this.registrationForm.valid) {
      // if is not Edit mode, means will save a new one
      this.productService
        .verifyProductExistence(newProduct.id)
        .pipe(take(1))
        .subscribe((exists: boolean) => {
          if (exists) {
            this.showErrorMessage(
              'Error',
              'Product already exists',
              toFinancialProduct(newProduct),
            );
          } else {
            this.productService
              .createProduct(newProduct)
              .pipe(
                take(1),
                // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-unused-vars
                catchError((_err) => {
                  this.showErrorMessage(
                    'Error',
                    'Failed to create product',
                    toFinancialProduct(newProduct),
                  );
                  return of(null);
                }),
              )
              .subscribe((createdProduct: FinancialProduct | null) => {
                if (createdProduct) {
                  this.showSuccessMessage(
                    'Success',
                    'Product created successfully',
                    createdProduct,
                  );
                  void this.router.navigate(['/products']);
                }
              });
          }
        });
    } else if (this.isEditMode && this.registrationForm.valid) {
      this.productService
        .updateProduct(newProduct)

        .pipe(
          take(1),
          // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-unused-vars
          catchError((_err) => {
            this.showErrorMessage(
              'Error',
              'Failed to update product',
              toFinancialProduct(newProduct),
            );
            return of(null);
          }),
        )
        .subscribe((updatedProduct: FinancialProduct | null) => {
          if (updatedProduct) {
            this.showSuccessMessage(
              'Success',
              'Product updated successfully',
              updatedProduct,
            );
            void this.router.navigate(['/products']);
          }
        });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  public showSuccessMessage(
    title: string,
    message: string,
    product: FinancialProduct,
  ): void {
    console.log(title, message, product);
  }

  public showErrorMessage(
    title: string,
    message: string,
    product: FinancialProduct,
  ): void {
    console.error(title, message, product);
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
}
