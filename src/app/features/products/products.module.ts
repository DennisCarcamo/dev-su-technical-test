import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { FormsModule } from '@angular/forms';
import { TableHeaderComponent } from 'src/app/shared/components/table-header/table-header.component';

@NgModule({
  declarations: [ProductsListPageComponent, ProductsTableComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    TableHeaderComponent,
  ],
})
export class ProductsModule {}
