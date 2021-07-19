import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IBanner } from 'src/app/interfaces/gallery.interface';
import { BannerImage, selectBanners } from './store';
import * as fromBannersActions from './store/actions/dynamic-bg.actions';

@Component({
  selector: 'app-dynamic-background',
  templateUrl: './dynamic-background.component.html',
  styleUrls: ['./dynamic-background.component.scss']
})
export class DynamicBackgroundComponent implements OnInit {

  banners$: Observable<BannerImage[]> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromBannersActions.loadDynamicBG());
    this.banners$ = this.store.pipe(select(selectBanners));
  }

}
