import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';
import { ProductEditCreatePageComponent } from './pages/product-edit-create-page/product-edit-create-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListPageComponent,
  },
  {
    path: 'edit/:id',
    component: ProductEditCreatePageComponent, // Ensure this component is imported from the correct path
  },
  {
    path: 'create',
    component: ProductEditCreatePageComponent, // Ensure this component is imported from the correct path
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
