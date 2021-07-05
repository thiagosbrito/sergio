import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from './menu.service';



@NgModule({
  declarations: [],
  providers: [
    MenuService
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ]
})
export class ServicesModule { }
