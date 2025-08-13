import { Component, Input, OnInit } from '@angular/core';
import { FinancialProduct } from '../../models/financial-product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  @Input() public products: FinancialProduct[] = [];

  constructor() {
    // empty
  }

  public ngOnInit(): void {
    // eslint-disable-next-line no-console
    console.log('Products Table Initialized');
  }

  public searchTerm: string = '';
  public pageSize: number = 5;

  public onSearch(): void {
    // Implement search functionality
    console.log('Searching for:', this.searchTerm);
  }

  public onAdd(): void {
    // Implement add functionality
    console.log('Add new product');
  }

  public onPageSizeChange(): void {
    // Implement page size change
    console.log('Page size changed to:', this.pageSize);
  }

  public onDelete(productId: string): void {
    // Implement delete functionality
    console.log('Delete clicked for product:', productId);
  }

  public onEdit(productId: string): void {
    // Implement edit functionality
    console.log('Edit clicked for product:', productId);
  }
}
