import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';

@NgModule({
  declarations: [
    ProductsListPageComponent
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
