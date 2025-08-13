import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, type Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module').then(
        // eslint-disable-next-line @typescript-eslint/typedef
        (m) => m.ProductsModule,
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then(
        // eslint-disable-next-line @typescript-eslint/typedef
        (m) => m.HomeModule,
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
