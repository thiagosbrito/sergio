import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { MenuService } from 'src/app/services/menu.service';
import * as fromMenuActions from './menu-items.actions';

@Injectable()
export class MenuEffects {

  loadMenuItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[MenuItems] Load MenuItems'),
      mergeMap(() =>
        this.menuService.getGalleryMenuItems().pipe(
          map(({ menuItems}) => fromMenuActions.loadMenuItemsSuccess({menuItems})),
          catchError(error => of(fromMenuActions.loadMenuItemsFailure({error})))
        )
      )
    )
  );

  constructor(private actions$: Actions, private menuService: MenuService) {}

}
