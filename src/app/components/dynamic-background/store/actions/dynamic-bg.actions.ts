import { createAction, props } from '@ngrx/store';
import { IBanner } from 'src/app/interfaces/gallery.interface';

export const loadDynamicBG = createAction(
  '[DynamicBG] Load DynamicBG'
);

export const loadDynamicBGSuccess = createAction(
  '[DynamicBG] Load DynamicBG Success',
  props<{ banners: IBanner[] }>()
);

export const loadDynamicBGFailure = createAction(
  '[DynamicBG] Load DynamicBG Failure',
  props<{ error: any }>()
);
