import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FinancialProduct } from '../../models/financial-product.model';
import { ModalType } from 'src/app/shared/types/modal-types';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  @Input() public products: FinancialProduct[] = [];
  @Output() public searchTermChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public emitDeleteProduct: EventEmitter<string> =
    new EventEmitter<string>();

  public isModalOpen: boolean = false;
  public modalType: ModalType = '';
  public modalMessage: string = '';
  public modalTitle: string = '';
  public showModalActions: boolean = false;

  public searchTerm: string = '';
  public pageSize: number = 10;
  public temporalProducts: FinancialProduct[] = [];

  constructor(private readonly detector: ChangeDetectorRef) {
    // empty
  }

  public ngOnInit(): void {
    this.pageSize = this.products.length;
    this.detector.detectChanges(); // Default to 10 if no products
  }

  public onSearch(): void {
    if (this.searchTerm) {
      this.searchTermChange.emit(this.searchTerm);
    } else {
      this.showErrorModal();
    }
  }

  private showErrorModal(): void {
    this.modalTitle = 'Error de búsqueda';
    this.modalMessage = 'Por favor, verifica criterio de búsqueda.';
    this.modalType = 'error';
    this.isModalOpen = true;
    this.detector.detectChanges();
  }

  public onCloseModal(): void {
    this.isModalOpen = false;
    this.detector.detectChanges();
  }

  public onAdd(): void {
    // Implement add functionality
    console.log('Add new product');
  }

  public onPageSizeChange(): void {
    if (this.temporalProducts.length === 0) {
      this.temporalProducts = [...this.products];
      this.detector.detectChanges();
    }
    if (this.pageSize < this.temporalProducts.length) {
      this.products = this.temporalProducts.slice(0, this.pageSize);
      this.detector.detectChanges();
    } else {
      this.products = [...this.temporalProducts];
    }
  }

  public onDelete(productId: string): void {
    this.emitDeleteProduct.emit(productId);
  }

  public onEdit(productId: string): void {
    // Implement edit functionality
    console.log('Edit clicked for product:', productId);
  }
}
