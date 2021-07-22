import {
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { MenuParentItem } from 'src/app/interfaces/menu.interfaces';
import { environment } from '../../../../environments/environment';
import { loadMenuItemsFailure, loadMenuItemsSuccess, selectMenuItem } from './menu-items.actions';

export const menuStateFeatureKey = 'menuState';

export interface MenuState {
  menuItems: MenuParentItem[];
  selectedItem: SelectedMenuItemState | undefined,
  error: any;
}

export interface SelectedMenuItemState {
  parentId: string;
  childId: string;
  thumbType: string;
  pages: number;
}

export const initialSelectedItemState: SelectedMenuItemState = {
  parentId: '',
  childId: '',
  thumbType: '',
  pages: 0
}

export const initialState: MenuState = {
  menuItems: [],
  selectedItem: undefined,
  error: undefined
}

export const reducers = createReducer(
  initialState,
  on(loadMenuItemsSuccess, (state: MenuState, action: any) => ({...state, menuItems: action.menuItems})),
  on(loadMenuItemsFailure, (state: MenuState, action: any) => ({...state, error: action.error})),
  on(selectMenuItem, (state: MenuState, action: any) => ({...state, selectedItem: {
    parentId: action.parentId,
    childId: action.childId,
    thumbType: action.thumbType,
    pages: action.pages
  }}))
)

export const selectMenuFeature = createFeatureSelector<MenuState>(
  menuStateFeatureKey
)

export const selectMenuItems = createSelector(
  selectMenuFeature,
  (state: MenuState) => state.menuItems
);

export const selectSelectedMenuItem = createSelector(
  selectMenuFeature,
  (state: MenuState) => state.selectedItem
)

export const metaReducers: MetaReducer<MenuState>[] = !environment.production ? [] : [];
