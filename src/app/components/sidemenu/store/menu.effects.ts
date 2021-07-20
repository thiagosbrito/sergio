import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';
import { SelectedMenuItemState } from '.';
import * as fromMenuActions from './menu-items.actions';
import * as fromGallery from '../../../gallery/store/gallery.actions';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class MenuEffects {

  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[MenuItems] Load MenuItems'),
      mergeMap(() => {
        this.ngxLoaderService.start();
        return this.menuService.getGalleryMenuItems().pipe(
          tap(() => this.ngxLoaderService.stop()),
          map(({menuItems}) => fromMenuActions.loadMenuItemsSuccess({ menuItems })),
          catchError(error => of(fromMenuActions.loadMenuItemsFailure({error})))
        )
      })
    )
  );

  selectMenuItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[MenuItems Select Item] - Select item'),
      tap((action: any) =>
        this.router.navigate([`gallery/${action.parentId}/${action.childId}/${action.thumbType ? action.thumbType : '0'}`])
      ),
    )
  , { dispatch: false });

  constructor(private actions$: Actions, private menuService: MenuService, private router: Router, private ngxLoaderService: NgxUiLoaderService) { }

}
