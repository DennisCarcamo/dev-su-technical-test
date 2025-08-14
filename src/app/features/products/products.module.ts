import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableHeaderComponent } from 'src/app/shared/components/table-header/table-header.component';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { ProductEditCreatePageComponent } from './pages/product-edit-create-page/product-edit-create-page.component';
import { ProductEditCreateFormComponent } from './components/product-edit-create-form/product-edit-create-form.component';

@NgModule({
  declarations: [
    ProductsListPageComponent,
    ProductsTableComponent,
    ProductEditCreatePageComponent,
    ProductEditCreateFormComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    TableHeaderComponent,
    ModalComponent,
    ConfirmationModalComponent,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
