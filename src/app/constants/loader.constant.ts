import {
  NgxUiLoaderConfig,
} from 'ngx-ui-loader';

export const LoaderConfig: NgxUiLoaderConfig = {
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#ffffff',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'three-strings',
  gap: 24,
  // logoPosition: 'center-center',
  // logoSize: 120,
  // logoUrl: "",
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(0,0,0,0.8)',
  pbColor: 'red',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: 'Carregando...',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
}
