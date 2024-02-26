import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

const primeNgComponents: any[]  = [
  AccordionModule,
  ButtonModule
]
@NgModule({
  imports: [primeNgComponents],
  exports: [primeNgComponents]
})
export class PrimeNgModule { }
