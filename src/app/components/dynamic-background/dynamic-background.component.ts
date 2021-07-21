import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IBanner } from 'src/app/interfaces/gallery.interface';
import { BannerImage, selectBanners } from './store';
import * as fromBannersActions from './store/actions/dynamic-bg.actions';

const carouselConfig: CarouselConfig = {
  interval: 5000,
  noPause: true,
  showIndicators: false,
  noWrap: true,
  indicatorsByChunk: false,
  itemsPerSlide: 1,
  pauseOnFocus: false,
  singleSlideOffset: false
}
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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromBannersActions.loadDynamicBG());
    this.banners$ = this.store.pipe(select(selectBanners))
  }

  public getImageUrl(image: BannerImage) {
    return `http://sergiorighini.com/2016/img/banners/${image.arquivo}`;
  }

  private defineActiveBanner(items: BannerImage[]): void {
    console.log(items);
  }
}
