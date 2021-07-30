import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './thumbs/gallery.component';

import { GalleryRoutingModule } from './gallery-routing.module';
import { StoreModule } from '@ngrx/store';
// import * as fromGallery from './store';
import { EffectsModule } from '@ngrx/effects';
// import { GalleryEffects } from './store/gallery.effects';
import { ComponentsModule } from '../components/components.module';
import { ViewComponent } from './view/view.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppCarouselSwipeDirective } from '../directives/carousel-swipe.directive';

@NgModule({
  declarations: [
    GalleryComponent,
    ViewComponent,
    AppCarouselSwipeDirective
  ],
  exports: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    CarouselModule,
    // StoreModule.forFeature(
    //   fromGallery.galleryStateFeatureKey,
    //   fromGallery.galleryReducers
    // ),
    // EffectsModule.forFeature([GalleryEffects]),
    ComponentsModule
  ]
})
export class GalleryModule { }
