import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ServicesModule } from '../services/services.module';

@NgModule({
  declarations: [
    SidemenuComponent
  ],
  exports: [
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    ServicesModule
  ]
})
export class ComponentsModule { }
