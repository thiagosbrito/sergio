import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromMenuState from './sidemenu/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from './sidemenu/store/menu.effects';

@NgModule({
  declarations: [
    SidemenuComponent
  ],
  exports: [
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ServicesModule,
    StoreModule.forFeature(fromMenuState.menuStateFeatureKey, fromMenuState.reducers, { metaReducers: fromMenuState.metaReducers }),
    EffectsModule.forFeature([MenuEffects])
  ]
})
export class ComponentsModule { }
