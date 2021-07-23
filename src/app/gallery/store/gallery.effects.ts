import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { GalleryService } from '../../services/gallery.service';
import * as fromGalleryActions from './gallery.actions';
import * as fromMenuActions from '../../components/sidemenu/store/menu-items.actions';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectGalleryCategory } from './index';

import * as _ from 'underscore';
import { selectSelectedMenuItem } from 'src/app/components/sidemenu/store';
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
  , { dispatch: false });


  selectFrame$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Gallery View Paint] - Select an item from gallery category'),
      mergeMap(({ itemId }) => {
        return this.store.pipe(
          select(selectGalleryCategory),
          filter(({ images }: any) => _.findWhere(images, { id: itemId})),
          map((response) => {
            return fromGalleryActions.setSelectedItem({ selectedGalleryItem: _.findWhere(response.images, {id: itemId})})
          })
        )
      })
    )
  )

  setFrame$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Gallery View Paint] - Set selected item on gallery store'),
      tap(({selectedGalleryItem}: any) => {
        this.store.pipe(select(selectSelectedMenuItem)).subscribe((response) => {
          this.router.navigate([`gallery/${response?.parentId}/type/${response?.childId}/${response?.thumbType}/view/${selectedGalleryItem.id}`])
        });
      })
    )
  , {dispatch: false})

  constructor(
    private actions$: Actions,
    private galleryService: GalleryService,
    private ngxLoaderService: NgxUiLoaderService,
    private router: Router,
    private store: Store) {}

}
