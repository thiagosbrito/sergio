import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { MenuParentItem } from 'src/app/interfaces/menu.interfaces';
import { environment } from '../../../../environments/environment';
import { loadMenuItemsFailure, loadMenuItemsSuccess } from './menu-items.actions';

export const menuStateFeatureKey = 'menuState';

export interface MenuState {
  menuItems: MenuParentItem[];
  error: any;
}

export const initialState: MenuState = {
  menuItems: [],
  error: undefined
}

export const reducers = createReducer(
  initialState,
  on(loadMenuItemsSuccess, (state: MenuState, action: any) => ({...state, ...action.menuItems})),
  on(loadMenuItemsFailure, (state: MenuState, action: any) => ({...state, error: action.error}))
)

export const selectMenuFeature = createFeatureSelector<MenuState>(
  menuStateFeatureKey
)

export const selectMenuItems = createSelector(
  selectMenuFeature,
  (state: MenuState) => state.menuItems
);

export const metaReducers: MetaReducer<MenuState>[] = !environment.production ? [] : [];
