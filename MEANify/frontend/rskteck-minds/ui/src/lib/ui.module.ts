import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  declarations: [
    BannerComponent,
    SliderComponent
  ],
    imports: [CommonModule],
    exports: [
      BannerComponent, 
      SliderComponent
    ]
   
})
export class UiModule {}
