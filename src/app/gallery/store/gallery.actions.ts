import { createAction, props } from '@ngrx/store';
import { GalleryState } from './index';

export const loadGallery = createAction(
  '[Gallery] Load Gallery Thumbs',
  props<{
    parentId: string,
    childId: string,
    currentPage: string
  }>()
);

export const loadGallerySuccess = createAction(
  '[Gallery] Load Gallery Thumbs Success',
  props<{ selectedItem: GalleryState }>()
);

export const loadGalleryFailure = createAction(
  '[Gallery] Load Gallery Thumbs Failure',
  props<{ error: any }>()
);

export const navigateToPage = createAction(
  '[Gallery Navigation] - Navigate to page',
  props<{ currentPage: number, action: 'PREV' | 'NEXT', parentId: string, childId: string, thumbType: string }>()
)

// export const loadGalleryItem = createAction(
//   '[Gallery Item] Load Paint',
//   props<{ galleryItem: GalleryItemState}>
// )
