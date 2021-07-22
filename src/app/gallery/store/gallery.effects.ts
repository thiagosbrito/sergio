import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { GalleryService } from '../../services/gallery.service';
import * as fromGalleryActions from './gallery.actions';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
@Injectable()
export class GalleryEffects {


  loadGalleryItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Gallery] Load Gallery Thumbs'),
      mergeMap(({ parentId, childId, currentPage}) => {
        this.ngxLoaderService.start();
        return this.galleryService.getGalleryImages(parentId, childId, currentPage).pipe(
          tap(() => this.ngxLoaderService.stop()),
          map((response) => fromGalleryActions.loadGallerySuccess({selectedItem: response}))
        )
      })
    )
  );

  navigateToPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Gallery Navigation] - Navigate to page'),
      tap(({ currentPage, action, parentId, childId, thumbType }) => {
        let currPage;
        action === 'NEXT' ? currPage = currentPage++ : currPage = currentPage--;
        this.router.navigate([`gallery/${parentId}/${childId}/${thumbType ? thumbType : '0'}/page/${currentPage}`])
      })
    )
  , { dispatch: false })

  constructor(private actions$: Actions, private galleryService: GalleryService, private ngxLoaderService: NgxUiLoaderService, private router: Router) {}

}
