import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromMenuState from './sidemenu/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './sidemenu/store/menu.effects';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    SidemenuComponent,
    LoaderComponent
  ],
  exports: [
    SidemenuComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule,
    StoreModule.forFeature(
      fromMenuState.menuStateFeatureKey,
      fromMenuState.reducers,
    ),
    EffectsModule.forFeature([MenuEffects])
  ]
})
export class ComponentsModule { }
