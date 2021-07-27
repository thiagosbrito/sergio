import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuParentItem, MenuResponse } from 'src/app/interfaces/menu.interfaces';
import { MenuService } from '../../services/menu.service';
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

  private domRef: any;

  constructor(
    private menuSerivce$: MenuService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
    ) { }

  ngOnInit(): void {
    this.domRef = document.documentElement;
    this.menuItems$ = this.menuSerivce$.getGalleryMenuItems().pipe(
      map(({menuItems}) => menuItems)
    );
  }


  navigateToGalleryItem(parentId: string, childId: string, thumbType: string, pages: number): void {
    this.router.navigate([`gallery/${parentId}/${childId}/${thumbType ? thumbType : '0'}/page/1`])
  }

  toggleMenuItem() {

  }

  requestFullscreen() {
    this.isFullscreenActive ? this.leaveFullscreeMode() : this.goToFullscreenMode();
    this.isFullscreenActive = !this.isFullscreenActive;

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
    // if (this.document.exitFullscreen) {
    // } else if (this.document.mozCancelFullScreen) {
    //   this.document.mozCancelFullScreen();
    // } else if (this.document.webkitExitFullscreen) {
    //   this.document.webkitExitFullscreen();
    // } else if (this.document.msExitFullscreen) {
    //   this.document.msExitFullscreen();
    // }
  }
}
