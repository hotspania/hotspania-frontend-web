import { NgModule } from '@angular/core';
import { FichaPipe } from './ficha.pipe';
import { ImagenPipe } from './images.pipe';
import { SafePipe } from './safe.pipe';





@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    SafePipe,
    FichaPipe
  ],
  exports: [
    ImagenPipe,
    SafePipe,
    FichaPipe
  ]
})
export class PipesModule { }