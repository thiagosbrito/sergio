import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GalleryService } from 'src/app/services/gallery.service';
import { IGalleryImage, IGalleryResponse } from '../../interfaces/gallery.interface';
import * as fromGallery from '../store/gallery.actions';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages: IGalleryImage[] = [];
  parentType: string = '';
  currentPage: string = '1';
  contentId: string = '1';

  parentId: string;
  childId: string;
  thumbType: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.parentId = this.route.snapshot.params.galleryId;
    this.childId = this.route.snapshot.params.childId;
    this.thumbType = this.route.snapshot.params.thumbType;
  }

  ngOnInit(): void {
    this.store.dispatch(fromGallery.loadGallery({
      parentId: this.parentId,
      childId: this.childId,
      thumbType: this.thumbType
    }));
  }

  mountImageUrl(thumb: any): string {
    return `http://sergiorighini.com/2016/img/${this.parentType}/tmb/${thumb.img_thumb}`;
  }

}
