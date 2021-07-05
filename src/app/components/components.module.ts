import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';

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
    ServicesModule
  ]
})
export class ComponentsModule { }
