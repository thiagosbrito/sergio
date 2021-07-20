import { createAction, props } from '@ngrx/store';
import { MenuParentItem } from 'src/app/interfaces/menu.interfaces';

export const loadMenuItems = createAction(
  '[MenuItems] Load MenuItems'
);

export const loadMenuItemsSuccess = createAction(
  '[MenuItems Effect] Load MenuItems Success',
  props<{ menuItems: MenuParentItem[] }>()
);

export const loadMenuItemsFailure = createAction(
  '[MenuItems Effect] Load MenuItems Failure',
  props<{ error: any }>()
);

export const selectMenuItem = createAction(
  '[MenuItems Select Item] - Select item',
  props<{ parentId: string, childId: string, thumbType: string}>()
)
