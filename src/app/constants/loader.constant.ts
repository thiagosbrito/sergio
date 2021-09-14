import {
  NgxUiLoaderConfig,
} from 'ngx-ui-loader';

export const LoaderConfig: NgxUiLoaderConfig = {
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: 'rgba(255, 255, 255, 0.35)',
  fgsPosition: 'center-center',
  fgsSize: 20,
  fgsType: 'square-loader',
  gap: 24,
  masterLoaderId: 'master',
  overlayColor: 'rgba(0,0,0,0.75)',
  hasProgressBar: false,
  text: 'Loading...',
  textColor: 'rgba(255, 255, 255, 0.35)',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
}
