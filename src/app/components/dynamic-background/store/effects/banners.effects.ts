import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { GalleryService } from '../../../../services/gallery.service';
import * as fromBannersActions from '../actions/dynamic-bg.actions';

@Injectable()
export class BannersEffects {

  loadBanners$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[DynamicBG] Load DynamicBG'),
      mergeMap(() =>
        this.galleryService.getHomeBackgroundImages().pipe(
          map(({ banners } ) => fromBannersActions.loadDynamicBGSuccess({ banners })),
          catchError(error => of(fromBannersActions.loadDynamicBGFailure({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private galleryService: GalleryService) {}

}
