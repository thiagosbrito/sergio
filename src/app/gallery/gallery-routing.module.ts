import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: ':parentId/:childId/:thumbType/page/:currentPage',
    component: GalleryComponent
  },
  {
    path: ':parentId/type/:childId/:thumbType/view/:itemId',
    component: ViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
