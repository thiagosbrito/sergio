import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagesService } from 'src/app/services/pages.service';

interface AboutResponse {
  aboutme: AboutContent
}

interface AboutContent {
  about_en: string;
  about_pt: string;
  arquivo: string;
  id: number
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  content$!: Observable<AboutContent>;

  constructor(private pagesService: PagesService) { }

  ngOnInit(): void {
    this.content$ = this.pagesService.getPagesContent<AboutResponse>('about_me').pipe(
      map((response: AboutResponse) => response.aboutme)
    );
  }

  getImageBackgroundUrl(file: string) {
    return `url(http://sergiorighini.com/2016/img/aboutme/${file})` ;
  }

}
