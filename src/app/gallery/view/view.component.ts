import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IGalleryImage } from 'src/app/interfaces/gallery.interface';
import { GalleryItem, SelectedGalleryItem, selectGalleryPic } from '../store';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  parentId: string | undefined;
  childId: string | undefined;
  thumbType: string | undefined;
  itemId: string | undefined;
  currentPage: string = '0';
  totalPages: number = 0;

  selectedItem$: Observable<SelectedGalleryItem> | undefined;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.parentId = this.route.snapshot.params.parentId;
    this.childId = this.route.snapshot.params.childId;
    this.thumbType = this.route.snapshot.params.thumbType;
    this.itemId = this.route.snapshot.params.itemId;
  }

  ngOnInit(): void {
    this.getSelectedGalleryItemFromStore();
  }

  getImageUrl(urlString: string | undefined): string {
    return `http://sergiorighini.com/2016/img/${this.parentId}/${urlString}`;
  }

  private getSelectedGalleryItemFromStore() {
    this.store.pipe(select(selectGalleryPic)).subscribe((res) => {
      this.selectedItem$ = of(res as SelectedGalleryItem);
    })
  }
}
