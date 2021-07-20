import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { loadDynamicBGFailure, loadDynamicBGSuccess } from './actions/dynamic-bg.actions';

export const bgStateFeatureKey = 'banners';

export interface BgState {
  items: BannerImage[];
  error: any;
}

export interface BannerImage {
  arquivo: string;
  id: number;
  titulo: string;
  active?: boolean;
}

export const initialBannersState: BgState = {
  items: [],
  error: undefined
}

export const reducer = createReducer(
  initialBannersState,
  on(loadDynamicBGSuccess, (state: BgState, action: any) => ({...state, items: action.banners})),
  on(loadDynamicBGFailure, (state: BgState, action: any) => ({...state, error: action.error}))
)

export const selectBannersFeature = createFeatureSelector<BgState>(
  bgStateFeatureKey
)

export const selectBanners = createSelector(
  selectBannersFeature,
  (state: BgState) => state.items
)

export const metaReducers: MetaReducer<BgState>[] = !environment.production ? [] : [];
