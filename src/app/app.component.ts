import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'sergiorighini';
  displayDynamicBanners: boolean = true;
  currentPage!: string[];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url.split('/');

        event.url === "/" ?
          this.displayDynamicBanners = true :
          this.displayDynamicBanners = false
      }
    })
  }

  getBackgroundClass() {
    return _.contains(this.currentPage, 'about-me') ||
           _.contains(this.currentPage, 'contact-me') ?
           'gradient' :
           'main'
  }
}
