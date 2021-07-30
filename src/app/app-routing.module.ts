import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then((m) => m.GalleryModule)
  },
  {
    path: 'contact-me',
    loadChildren: () => import('./contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: 'about-me',
    loadChildren: () => import('./about-me/about-me.module').then((m) => m.AboutMeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
