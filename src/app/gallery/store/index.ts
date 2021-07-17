import {
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { loadGalleryFailure, loadGallerySuccess } from './gallery.actions';

export const galleryStateFeatureKey = 'galleryState';

export interface GalleryState {
  selectedItem: {
    pages: number | undefined
    total_images: number | undefined;
    images: any[] | undefined;
    activeItem: string | undefined;
    childId?: string | undefined;
    thumbType: string | undefined;
  },
  error?: any;
}

export interface GalleryItem {
  id: string;
  titlePt: string;
  titleEn: string;
  tipo_thumb: string;
  pages: number;
}

export const galleryInitialState: GalleryState = {
  selectedItem: {
    pages: undefined,
    total_images: undefined,
    images:  undefined,
    activeItem: undefined,
    childId: undefined,
    thumbType: undefined
  },
  error: undefined
}

export const galleryReducers = createReducer(
  galleryInitialState,
  on(loadGallerySuccess, (state: GalleryState, action: any) => ({...state, selectedItem: action.selectedItem})),
  on(loadGalleryFailure, (state: GalleryState, action: any) => ({...state, error: action.error}))
)

export const selectGalleryFeature = createFeatureSelector<GalleryState>(
  galleryStateFeatureKey
)

export const selectGalleryItem = createSelector(
  selectGalleryFeature,
  (state: GalleryState) => state.selectedItem
)

export const imagesFromSelectedItem = createSelector(
  selectGalleryFeature,
  ({ selectedItem }) => selectedItem.images
)

export const metaReducers: MetaReducer<GalleryState>[] = !environment.production ? [] : [];
