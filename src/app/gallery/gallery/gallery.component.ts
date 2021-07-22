import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { IGalleryImage, IGalleryItem, IGalleryResponse } from '../../interfaces/gallery.interface';
import * as fromGallery from '../store/gallery.actions';
import { GalleryState, selectGalleryItem, imagesFromSelectedItem } from '../store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DOCUMENT } from '@angular/common';
import { SelectedMenuItemState, selectSelectedMenuItem } from 'src/app/components/sidemenu/store';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages$: Observable<any[]> | any;
  parentType: string = '';
  currentPage: string = '1';
  contentId: string = '1';

  parentId: string;
  childId: string;
  thumbType: string;
  totalPages: number | undefined;

  selectedGalleryItem$: Observable<SelectedMenuItemState | undefined> | undefined;

  @ViewChildren("loaderElm") loaderElm: QueryList<ElementRef> | undefined;

  constructor(
    private route: ActivatedRoute,
    private ngxLoaderService: NgxUiLoaderService,
    private store: Store,
  ) {
    this.parentId = this.route.snapshot.params.parentId;
    this.childId = this.route.snapshot.params.childId;
    this.thumbType = this.route.snapshot.params.thumbType;
  }

  ngOnInit(): void {

    this.galleryImages$ = this.store.pipe(select(imagesFromSelectedItem));
    this.selectedGalleryItem$ = this.store.pipe(
      select(selectSelectedMenuItem),
      tap((state) => this.totalPages = state?.pages),
      tap(() => console.log(this.totalPages))
    );
    this.getGalleryImages(this.parentId, this.childId, this.thumbType);
    this.route.params.subscribe(({ parentId, childId, thumbType, currentPage }) => {
      this.parentId = parentId;
      this.childId = childId;
      this.thumbType = thumbType;
      this.currentPage = currentPage
      this.getGalleryImages(this.parentId, this.childId, this.currentPage);
    });
  }

  mountImageUrl(thumb: any): string {
    return `http://sergiorighini.com/2016/img/${this.parentId}/tmb/${thumb.img_thumb ? thumb.img_thumb : 0}`;
  }

  getGalleryImages(parentId: string, childId: string, thumbType: string) {
    this.store.dispatch(fromGallery.loadGallery({
      parentId: parentId,
      childId: childId,
      currentPage: thumbType
    }));
  }

  closeLoader(loader: any) {
    let loaderId = loader.getAttribute('loaderId');
    this.loaderElm?.map((element) => {
      if (element.nativeElement.attributes.loaderId && element.nativeElement.attributes.loaderId.value === loaderId) {
        element.nativeElement.classList.add('hidden');
      }
    })
  }

  navigateToPage(action: 'PREV' | 'NEXT'): void {
    this.store.dispatch(fromGallery.navigateToPage({
      currentPage: parseInt(this.currentPage),
      action: action,
      parentId: this.parentId,
      childId: this.childId,
      thumbType: this.thumbType
    }))
  }

  convertToInt(string: string): number {
    return parseInt(string);
  }
}
