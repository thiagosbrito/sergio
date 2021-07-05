import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface IGalleryResponse {
  images: any[],
  pages: number;
  total_images: number;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImages: any[] = [];
  parentType: string = '';
  currentPage: string = '1';
  contentId: string = '1';

  constructor(private galleryService: GalleryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.galleryService.getGalleryImages('paintings', '1', '1').subscribe((results: IGalleryResponse) => {
      this.galleryImages = results.images;
      console.log(results);
    });

    this.route.paramMap.subscribe((params) => {
      this.parentType = params.get('parent') as string;
      this.contentId = params.get('contentId') as string;
      this.currentPage = '1';
    });
    // this.route.paramMap.pipe(
    //   switchMap(params => {
    //     return this.getGalleryThumbs(this.parentType, this.contentId);
    //   })
    // );
  }

  getGalleryThumbs(parent: string, contentId: string) {
    this.galleryService.getGalleryImages(parent, contentId, '1').subscribe(results => {
      console.log(results);
    });
    return this.galleryService.getGalleryImages(parent, contentId, '1');
  }

  mountImageUrl(thumb: any): string {
    return `http://sergiorighini.com/2016/img/${this.parentType}/tmb/${thumb.img_thumb}`;
  }

}
