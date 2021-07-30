import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { MenuParentItem, MenuResponse } from 'src/app/interfaces/menu.interfaces';
import { MenuService } from '../../services/menu.service';
import * as _ from 'underscore';

interface GalleryMenuItem {
  title: string;
  link: string;
  child?: ChildGalleryMenuItem[]
}

interface ChildGalleryMenuItem {
  titlePT?: string | null;
  titleEN: string;
  link: string;
}

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  public galleryMenuItems: MenuParentItem[] = [];
  public menuItems: MenuParentItem[] = [];
  public menuItems$: Observable<MenuParentItem[]> | undefined;
  public isCollapsed = 0;
  public isFullscreenActive: boolean = false;
  public isControlButtonsVisible: boolean = false;
  public isGoToGalleryButtonVisible: boolean = false;
  public isGalleryMenuVisible: boolean = true;
  public isMenuActive: boolean = false;

  private parentId!: string;
  private childId!: string;
  private thumbType!: string;
  private currentGalleryPage!: string;

  private domRef: any;

  constructor(
    private menuSerivce$: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any
    ) { }

  ngOnInit(): void {
    this.domRef = document.documentElement;
    this.menuItems$ = this.menuSerivce$.getGalleryMenuItems().pipe(
      map(({menuItems}) => menuItems)
    );

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd ),
      tap((events: Event) => {
        this.getUrlParams(events);
        this.handleControlButtonsVisibility(events);
        this.isMenuActive = false;
      })
    ).subscribe();
  }

  public getUrlParams(event: any) {
    const currUrl = event.url.split('/');

    if (_.contains(currUrl, 'gallery') && !_.contains(currUrl, 'view')) {
      this.parentId = currUrl[2];
      this.childId = currUrl[3];
      this.thumbType = currUrl[4];
      this.currentGalleryPage = currUrl[6];
    }

    if (_.contains(currUrl, 'about-me') || _.contains(currUrl, 'contact-me')) {
      this.isGalleryMenuVisible = false;
    } else {
      this.isGalleryMenuVisible = true;
    }
  }

  public navigateToGalleryItem(parentId: string, childId: string, thumbType: string, pages: number) {
    this.router.navigate([`gallery/${parentId}/${childId}/${thumbType ? thumbType : '0'}/page/1`]);
  }

  public requestFullscreen() {
    this.isFullscreenActive ? this.leaveFullscreeMode() : this.goToFullscreenMode();
    this.isFullscreenActive = !this.isFullscreenActive;
  }

  public goBackToGallery() {
    this.router.navigate([`gallery/${this.parentId}/${this.childId}/${this.thumbType ? this.thumbType : '0'}/page/${this.currentGalleryPage}`]);
  }

  private handleControlButtonsVisibility(event: any): void {
    let currentPage;

    if (event?.url) {
      currentPage = event.url.split('/');
      this.isControlButtonsVisible = _.contains(currentPage, 'gallery');
      this.isGoToGalleryButtonVisible = _.contains(currentPage, 'view');
    }

  }

  private goToFullscreenMode() {
    if (this.domRef.requestFullscreen) {
      this.domRef.requestFullscreen();
    } else if (this.domRef.mozRequestFullScreen) {
      this.domRef.mozRequestFullScreen();
    } else if (this.domRef.webkitRequestFullscreen) {
      this.domRef.webkitRequestFullscreen();
    } else if (this.domRef.msRequestFullscreen) {
      this.domRef.msRequestFullscreen();
    }
  }

  private leaveFullscreeMode() {
    if (this.document.fullscreenElement ||
      this.document.webkitFullscreenElement ||
      this.document.mozFullScreenElement) {
        this.document.exitFullscreen();
    }
  }
}
