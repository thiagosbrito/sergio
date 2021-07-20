import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { GalleryService } from '../../services/gallery.service';
import * as fromGalleryActions from './gallery.actions';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable()
export class GalleryEffects {

  loadGalleryItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Gallery] Load Gallery Thumbs'),
      mergeMap(({ parentId, childId, thumbType}) => {
        this.ngxLoaderService.start();
        return this.galleryService.getGalleryImages(parentId, childId, thumbType).pipe(
          tap(() => this.ngxLoaderService.stop()),
          map((response) => fromGalleryActions.loadGallerySuccess({selectedItem: response}))
        )
      })
    )
  );

  constructor(private actions$: Actions, private galleryService: GalleryService, private ngxLoaderService: NgxUiLoaderService) {}

}
