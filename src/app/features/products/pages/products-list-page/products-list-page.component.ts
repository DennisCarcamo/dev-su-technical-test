import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { catchError, of, take } from 'rxjs';
import { FinancialProduct } from '../../models/financial-product.model';
import { ModalType } from 'src/app/shared/types/modal-types';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.css'],
})
export class ProductsListPageComponent implements OnInit {
  public products: FinancialProduct[] = [];
  public isLoadingProducts: boolean = true;

  public modalTitle: string = '';
  public modalMessage: string = '';
  public isModalOpen: boolean = false;
  public modalType: ModalType = 'success';

  public confirmationModalTitle: string = '';
  public confirmationProductId: string = '';
  public confirmationModalMessage: string = '';
  public isConfirmationMsModalOpen: boolean = false;
  public confirmationModalType: ModalType = 'success';

  constructor(
    private readonly productsService: ProductsService,
    private readonly detection: ChangeDetectorRef,
  ) {
    // empty
  }

  public ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsService
      .getProducts()
      .pipe(take(1))
      .subscribe((products: FinancialProduct[]) => {
        this.products = products;
        this.isLoadingProducts = false;
        this.detection.detectChanges();
      });
  }

  public onSearchTermChange(searchTerm: string): void {
    this.productsService
      .getProductById(searchTerm)
      .pipe(
        take(1),
        catchError(() => {
          this.products = [];
          this.modalTitle = 'Error';
          this.modalMessage = 'No se encontró el producto con ese ID.';
          this.modalType = 'error';
          this.isModalOpen = true;
          return of(null);
        }),
      )
      .subscribe((product: FinancialProduct | null) => {
        if (product) {
          this.products = [product];
        }
        this.isLoadingProducts = false;
        this.detection.detectChanges();
      });
  }

  public onDeleteProduct(productId: string): void {
    if (productId) {
      this.confirmationProductId = productId;
      this.confirmationModalMessage =
        '¿Estás seguro de que deseas eliminar este producto?';
      this.confirmationModalTitle = 'Confirmar eliminación';
      this.confirmationModalType = 'warning';
      this.isConfirmationMsModalOpen = true;
      this.detection.detectChanges();
    }
  }

  public onCloseModal(): void {
    this.isModalOpen = false;
    this.detection.detectChanges();
  }

  public onCloseConfirmationModal(): void {
    this.resetConfirmationModal();
    this.isConfirmationMsModalOpen = false;
    this.detection.detectChanges();
  }

  public onConfirmDeleteProduct(productId: string): void {
    this.resetConfirmationModal();
    this.isConfirmationMsModalOpen = false;
    this.detection.detectChanges();
    this.productsService
      .deleteProduct(productId)
      .pipe(take(1))
      .subscribe(() => {
        this.loadProducts();
      });
  }

  public onCancelDeleteProduct(): void {
    this.resetConfirmationModal();
    this.isConfirmationMsModalOpen = false;
    this.detection.detectChanges();
  }

  private resetConfirmationModal(): void {
    this.confirmationModalTitle = '';
    this.confirmationModalMessage = '';
    this.confirmationModalType = 'success';
  }
}
