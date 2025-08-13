import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { take } from 'rxjs';
import { FinancialProduct } from '../../models/financial-product.model';

@Component({
  selector: 'app-products-list-page',
  templateUrl: './products-list-page.component.html',
  styleUrls: ['./products-list-page.component.css'],
})
export class ProductsListPageComponent implements OnInit {
  public products: FinancialProduct[] = [];
  public isLoadingProducts: boolean = true;

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
}
