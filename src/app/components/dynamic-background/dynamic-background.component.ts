import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IBanner } from 'src/app/interfaces/gallery.interface';
import { LoaderService } from '../loader/loader.service';
import { BannerImage, selectBanners } from './store';
import * as fromBannersActions from './store/actions/dynamic-bg.actions';

const carouselConfig: CarouselConfig = {
  interval: 5000,
  noPause: true,
  showIndicators: false,
  noWrap: false,
  indicatorsByChunk: false,
  itemsPerSlide: 1,
  pauseOnFocus: false,
  singleSlideOffset: false
}
const isMobile = window.innerWidth < 1366;
@Component({
  selector: 'app-dynamic-background',
  templateUrl: './dynamic-background.component.html',
  styleUrls: ['./dynamic-background.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: carouselConfig }
  ]
})
export class DynamicBackgroundComponent implements OnInit {

  banners$: Observable<BannerImage[]> | undefined;
  isLoading: boolean = true;

  constructor(private store: Store, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.store.dispatch(fromBannersActions.loadDynamicBG());
    this.banners$ = this.store.pipe(select(selectBanners))
  }

  public getImageUrl(image: BannerImage) {
    let imageUrl;
    if (isMobile) {
      imageUrl = `http://sergiorighini.com/2016/img/banners/mobile/${image.arquivo_mobile}`;
    } else {
      imageUrl = `http://sergiorighini.com/2016/img/banners/${image.arquivo}`;
    }
    return imageUrl;
  }

  closeLoader(loaderId: string) {
    this.isLoading = false;
    this.loaderService.stopLoader(loaderId);
  }



}
