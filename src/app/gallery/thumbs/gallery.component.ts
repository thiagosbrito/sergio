import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { IGalleryImage, IGalleryResponse } from '../../interfaces/gallery.interface';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages$: Observable<any[]> | any;
  selectedGalleryItem$!: Observable<IGalleryResponse>;

  parentType: string = '';

  contentId: string = '1';

  parentId!: string;
  childId!: string;
  thumbType!: string;

  currentPage!: string;
  currentMobilePage: number = 1;
  totalPages$: Observable<number> = of(0);

  allImages$!: Observable<any[]>

  @ViewChildren("loaderElm") loaderElm: QueryList<ElementRef> | undefined;

  constructor(
    private route: ActivatedRoute,
    private galleryService$: GalleryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    console.log('Init eh brasil')

    this.getAllImages();
    this.getImagesFromGallery();

    this.router.events.pipe(
      filter((e: any) => e instanceof NavigationEnd)
    ).subscribe(() => {
      this.getAllImages();
      this.getImagesFromGallery();
    });
  }

  mountImageUrl(thumb: any): string {
    return `http://sergiorighini.com/2016/img/${this.parentId}/tmb/${thumb.img_thumb ? thumb.img_thumb : 0}`;
  }

  getImageUrl(image: IGalleryImage): string {
    return `url(http://sergiorighini.com/2016/img/${this.parentId}/mobile/${image.img_mobile})`;
  }

  closeLoader(loader: any) {
    let loaderId = loader.getAttribute('loaderId');
    this.loaderElm?.map((element) => {
      if (element.nativeElement.attributes.loaderId && element.nativeElement.attributes.loaderId.value === loaderId) {
        element.nativeElement.classList.add('hidden');
      }
    })
  }

  getImagesFromGallery() {
    this.updateParamsForQuery();
    this.galleryService$.getGalleryImages(this.parentId, this.childId, this.currentPage).subscribe((response) => {
      this.selectedGalleryItem$ = of(response);
      this.totalPages$ = of(response.pages);
      this.galleryImages$ = of(response.images);
    })
  }

  getAllImages() {
    this.allImages$ = EMPTY;
    this.updateParamsForQuery();
    this.galleryService$.getGalleryImages(this.parentId, this.childId, '0').subscribe((response) => {
      this.allImages$ = of(response.images);
    })
  }

  navigateToPage(action: 'PREV' | 'NEXT'): void {
    let currPage = parseInt(this.currentPage);
    action === 'NEXT' ? currPage = currPage + 1 : currPage = currPage - 1;
    this.router.navigate([`gallery/${this.parentId}/${this.childId}/${this.thumbType ? this.thumbType : '0'}/page/${currPage}`])
    // this.getImagesFromGallery(currPage);
  }

  convertToInt(string: string): number {
    return parseInt(string);
  }

  selectItem(itemId: number) {
    // change to effect
    this.router.navigate([`gallery/${this.parentId}/${this.childId}/${this.thumbType ? this.thumbType : '0'}/view/${itemId}`])
  }

  get isMobile() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ return true }
    else { return false }
  }

  activeSlideChanged(event: any) {
    this.currentMobilePage = event + 1;
    this.cdr.detectChanges();
  }

  private updateParamsForQuery() {
    this.parentId = this.route.snapshot.params.parentId;
    this.childId = this.route.snapshot.params.childId;
    this.thumbType = this.route.snapshot.params.thumbType;
    this.currentPage = this.route.snapshot.params.currentPage;
  }
}
