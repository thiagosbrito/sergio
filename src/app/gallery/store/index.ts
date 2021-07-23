import {
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { loadGalleryFailure, loadGallerySuccess, setSelectedItem } from './gallery.actions';

export const galleryStateFeatureKey = 'galleryState';

export interface GalleryState {
  selectedGalleryCategory: {
    pages: number | undefined
    total_images: number | undefined;
    images: any[] | undefined;
    activeItem: string | undefined;
    childId?: string | undefined;
    thumbType: string | undefined;
  },
  selectedGalleryItem: SelectedGalleryItem | undefined;
  error?: any;
}

export interface GalleryItem {
  id: string;
  titlePt: string;
  titleEn: string;
  tipo_thumb: string;
  pages: number;
}

export interface SelectedGalleryItem {
  id: number;
  img_grande: string;
  img_thumb: string;
  link: string;
  obra_1: string;
  obra_2: string;
  primeira_linha: string;
  segunda_linha: string;
  texto_link: string;
}

export const galleryInitialState: GalleryState = {
  selectedGalleryCategory: {
    pages: undefined,
    total_images: undefined,
    images:  undefined,
    activeItem: undefined,
    childId: undefined,
    thumbType: undefined
  },
  selectedGalleryItem: undefined,
  error: undefined
}

export const galleryReducers = createReducer(
  galleryInitialState,
  on(loadGallerySuccess, (state: GalleryState, action: any) => ({...state, selectedGalleryCategory: action.selectedItem})),
  on(loadGalleryFailure, (state: GalleryState, action: any) => ({...state, error: action.error})),
  on(setSelectedItem, (state: GalleryState, action: any ) => ({...state, selectedGalleryItem: action.selectedGalleryItem}))
)

export const selectGalleryFeature = createFeatureSelector<GalleryState>(
  galleryStateFeatureKey
)

export const selectGalleryCategory = createSelector(
  selectGalleryFeature,
  (state: GalleryState) => state.selectedGalleryCategory
)

export const imagesFromSelectedItem = createSelector(
  selectGalleryFeature,
  ({ selectedGalleryCategory: selectedItem }) => selectedItem.images
)

export const selectGalleryPic = createSelector(
  selectGalleryFeature,
  ({ selectedGalleryItem: selectedGalleryItem}) => selectedGalleryItem
)

export const metaReducers: MetaReducer<GalleryState>[] = !environment.production ? [] : [];
