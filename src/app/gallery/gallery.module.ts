import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryComponent } from './gallery/gallery.component';

import { GalleryRoutingModule } from './gallery-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromGallery from './store';
import { EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from './store/gallery.effects';

@NgModule({
  declarations: [
    GalleryComponent
  ],
  exports: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    StoreModule.forFeature(
      fromGallery.galleryStateFeatureKey,
      fromGallery.galleryReducers
    ),
    EffectsModule.forFeature([GalleryEffects])
  ]
})
export class GalleryModule { }
