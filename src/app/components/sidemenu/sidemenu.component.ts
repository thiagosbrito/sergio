import { Component, OnInit } from '@angular/core';
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

  public galleryMenuItems: any[] = [];

  // FROM 1998 TO 2003

  // SÉRIE QUADROS INCOMPLETOS
  // SERIES INCOMPLETE PAINTINGS

  constructor(private menuSerivce$: MenuService) { }

  ngOnInit(): void {
    this.getMenuItems();
  }

  private getMenuItems() {
    this.menuSerivce$.getGalleryMenuItems().subscribe(({ menuItems }) => {
      this.galleryMenuItems = menuItems;
      console.log(this.galleryMenuItems);
    })
  }

}
