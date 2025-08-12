import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, type Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/products/products.module').then(
        // eslint-disable-next-line @typescript-eslint/typedef
        (m) => m.ProductsModule,
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
