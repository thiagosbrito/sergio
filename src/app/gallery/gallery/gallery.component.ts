import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryService } from 'src/app/services/gallery.service';
import { IGalleryImage, IGalleryResponse } from '../../interfaces/gallery.interface';

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

  constructor(private galleryService: GalleryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.galleryService.getGalleryImages('paintings', '1', '1').subscribe((results: IGalleryResponse) => {
      this.galleryImages = results.images;
    });

    this.route.paramMap.subscribe((params) => {
      this.parentType = params.get('parent') as string;
      this.contentId = params.get('contentId') as string;
      this.currentPage = '1';
    });
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
