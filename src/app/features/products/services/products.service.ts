/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { IProductService } from 'src/app/core/services/product.interface';
import {
  FinancialProduct,
  FinancialProductDto,
  toFinancialProduct,
} from '../models/financial-product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiResponseEntity,
  ApiSimpleResponse,
} from 'src/app/core/data/entity/api-response.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements IProductService {
  constructor(private readonly http: HttpClient) {
    //Empty
  }
  public getProducts(): Observable<FinancialProduct[]> {
    return this.http
      .get<
        ApiResponseEntity<FinancialProductDto[]>
      >(`${environment.API_URL}/bp/products`)
      .pipe(
        map((response: ApiResponseEntity<FinancialProductDto[]>) =>
          response.data.map((dto: FinancialProductDto) =>
            toFinancialProduct(dto),
          ),
        ),
      );
  }

  public getProductById(id: string): Observable<FinancialProduct | null> {
    return this.http
      .get<FinancialProductDto>(`${environment.API_URL}/bp/products/${id}`)
      .pipe(
        map((response: FinancialProductDto) => {
          const product: FinancialProduct | null = response
            ? toFinancialProduct(response)
            : null;
          return product;
        }),
      );
  }

  public deleteProduct(id: string): Observable<string> {
    return this.http
      .delete<
        ApiSimpleResponse<string>
      >(`${environment.API_URL}/bp/products/${id}`)
      .pipe(map((response: ApiSimpleResponse<string>) => response.message));
  }

  public updateProduct(
    product: FinancialProduct,
  ): Observable<FinancialProduct[]> {
    return this.http
      .put<
        FinancialProduct[]
      >(`${environment.API_URL}/bp/products/${product.id}`, product)
      .pipe(map((response: FinancialProduct[]) => response));
  }
}
