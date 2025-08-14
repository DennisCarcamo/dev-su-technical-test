import { Observable } from 'rxjs';
import {
  FinancialProduct,
  FinancialProductDto,
} from 'src/app/features/products/models/financial-product.model';

export abstract class IProductService {
  public abstract getProducts(): Observable<FinancialProduct[]>;
  public abstract getProductById(
    id: string,
  ): Observable<FinancialProduct | null>;
  public abstract deleteProduct(id: string): Observable<string>;
  public abstract createProduct(
    product: FinancialProductDto,
  ): Observable<FinancialProduct | null>;
  public abstract updateProduct(
    product: FinancialProductDto,
  ): Observable<FinancialProduct | null>;
  public abstract verifyProductExistence(id: string): Observable<boolean>;
}
