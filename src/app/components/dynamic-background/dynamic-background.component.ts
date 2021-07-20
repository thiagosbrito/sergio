import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { IBanner } from 'src/app/interfaces/gallery.interface';
import { BannerImage, selectBanners } from './store';
import * as fromBannersActions from './store/actions/dynamic-bg.actions';

@Component({
  selector: 'app-dynamic-background',
  templateUrl: './dynamic-background.component.html',
  styleUrls: ['./dynamic-background.component.scss']
})
export class DynamicBackgroundComponent implements OnInit {

  banners: any;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromBannersActions.loadDynamicBG());
    this.store.pipe(select(selectBanners)).subscribe((banners) => {
      this.defineActiveBanner(banners);
    });
  }

  public getImageUrl(image: BannerImage) {
    return `http://sergiorighini.com/2016/img/banners/${image.arquivo}`;
  }

  private defineActiveBanner(items: BannerImage[]): void {
    console.log(items);
  }
}
