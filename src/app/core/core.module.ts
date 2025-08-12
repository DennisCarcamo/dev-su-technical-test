import { NgModule, Optional, SkipSelf } from '@angular/core';
// Importa aquí tus interceptores, guards, servicios globales
@NgModule({
  providers: [],
})
export class CoreModule {
  // Este constructor evita que CoreModule se importe más de una vez (patrón singleton)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya ha sido cargado. Importarlo solo en AppModule.',
      );
    }
  }
}
