import { Observable } from 'rxjs';
import { FinancialProduct } from 'src/app/features/products/models/financial-product.model';

export abstract class IProductService {
  public abstract getProducts(): Observable<FinancialProduct[]>;
  public abstract getProductById(
    id: string,
  ): Observable<FinancialProduct | null>;
  public abstract deleteProduct(id: string): Observable<FinancialProduct[]>;
  public abstract updateProduct(
    product: FinancialProduct,
  ): Observable<FinancialProduct[]>;
}
