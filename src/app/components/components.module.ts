import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromMenuState from './sidemenu/store';
import * as fromBanners from './dynamic-background/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './sidemenu/store/menu.effects';
import { BannersEffects } from './dynamic-background/store/effects/banners.effects';
import { LoaderComponent } from './loader/loader.component';
import { DynamicBackgroundComponent } from './dynamic-background/dynamic-background.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CopyrightComponent } from './copyright/copyright.component';

@NgModule({
  declarations: [
    SidemenuComponent,
    LoaderComponent,
    DynamicBackgroundComponent,
    CopyrightComponent
  ],
  exports: [
    SidemenuComponent,
    LoaderComponent,
    DynamicBackgroundComponent,
    CopyrightComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule,
    CarouselModule,
    AccordionModule,
    NgxUiLoaderModule,
    StoreModule.forFeature(
      fromMenuState.menuStateFeatureKey,
      fromMenuState.reducers,
    ),
    EffectsModule.forFeature([MenuEffects]),
    StoreModule.forFeature(
      fromBanners.bgStateFeatureKey,
      fromBanners.reducer
    ),
    EffectsModule.forFeature([BannersEffects])
  ]
})
export class ComponentsModule { }
