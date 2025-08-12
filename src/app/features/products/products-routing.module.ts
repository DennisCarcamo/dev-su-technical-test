import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListPageComponent } from './pages/products-list-page/products-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
