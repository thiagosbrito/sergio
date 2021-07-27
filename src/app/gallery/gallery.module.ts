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

@NgModule({
  declarations: [
    GalleryComponent,
    ViewComponent
  ],
  exports: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    // StoreModule.forFeature(
    //   fromGallery.galleryStateFeatureKey,
    //   fromGallery.galleryReducers
    // ),
    // EffectsModule.forFeature([GalleryEffects]),
    ComponentsModule
  ]
})
export class GalleryModule { }
