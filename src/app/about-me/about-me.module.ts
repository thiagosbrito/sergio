import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { PageComponent } from './page/page.component';
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    NgScrollbarModule
  ]
})
export class AboutMeModule { }
