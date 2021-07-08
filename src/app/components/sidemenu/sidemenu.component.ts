import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuParentItem } from 'src/app/interfaces/menu.interfaces';
import { MenuService } from '../../services/menu.service';
import { MenuState, selectMenuItems } from './store';
import * as fromMenu from './store/menu-items.actions';
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

  constructor(private menuSerivce$: MenuService, private router: Router, private store: Store<MenuState>) { }

  ngOnInit(): void {
    this.store.dispatch(fromMenu.loadMenuItems());
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuItems$ = this.store.pipe(select(selectMenuItems));
  }

}
