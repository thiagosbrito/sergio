import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IGalleryImage, IGalleryResponse } from 'src/app/interfaces/gallery.interface';
import { GalleryService } from 'src/app/services/gallery.service';
// import { GalleryItem, imagesFromSelectedItem, SelectedGalleryItem, selectGalleryCategory, selectGalleryPic } from '../store';
// import * as fromGallery from './../store/gallery.actions';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  parentId!: string;
  childId!: string;
  thumbType!: string;
  itemId: string | undefined;
  currentPage: string = '0';
  totalPages$: Observable<number | undefined> = of(0);
  selectedCategoryImages: any;
  allImages!: IGalleryImage[];

  selectedItem$!: Observable<IGalleryImage>;

  @ViewChild('loader') loader!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private galleryService: GalleryService
    ) {
    this.parentId = this.route.snapshot.params.parentId;
    this.childId = this.route.snapshot.params.childId;
    this.thumbType = this.route.snapshot.params.thumbType;
    this.itemId = this.route.snapshot.params.itemId;
  }

  ngOnInit(): void {
    this.getSelectedImage();
    this.router.events.pipe(
      filter((e: any) => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.getSelectedImage();
    });
  }

  getSelectedImage() {
    this.galleryService.getGalleryImages(this.parentId, this.childId, '0').subscribe((response) => {
      this.allImages = response.images;
      response.images.filter((image) => {
        if (image.id === parseInt(this.itemId as string)) {
          this.transformImageObject(image);
        }
      })
    })
  }

  getCurrentImageIndex() {}

  getImageUrl(urlString: string | undefined): string {
    // console.log('getImageUrl called once');
    // const scope = this;
    // setTimeout(() => {
    //   scope.closeLoader();
    // }, 1500);
    return `url(http://sergiorighini.com/2016/img/${this.parentId}/${urlString})`;
  }

  navigateTo(itemId: number | undefined) {
    this.itemId = itemId?.toString();
    // this.showLoader();
    this.router.navigate([`gallery/${this.parentId}/${this.childId}/${this.thumbType ? this.thumbType : '0'}/view/${itemId}`])
  }

  showLoader() {
    this.selectedItem$ = EMPTY;
    this.loader.nativeElement.classList.remove('hidden');
  }

  closeLoader() {
    console.log('closeLoader called once');
    this.loader.nativeElement.classList.add('hidden');
  }

  private transformImageObject(image: IGalleryImage) {
    let itemIndex = this.allImages.indexOf(image);

    this.currentPage = (itemIndex + 1).toString();
    this.totalPages$ = of(this.allImages.length);

    let prevIndex = this.allImages.indexOf(image) === 0 ? -1 : itemIndex - 1;
    let nextIndex = this.allImages.indexOf(image) === this.allImages.length - 1 ? -1 : itemIndex + 1;

    image.prev = prevIndex >= 0 ? this.allImages[prevIndex].id : undefined;
    image.next = nextIndex >= 0 ? this.allImages[nextIndex].id : undefined;

    this.selectedItem$ = of(image);
  }
}
