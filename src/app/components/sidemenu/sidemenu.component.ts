import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private menuSerivce$: MenuService, private router: Router,) { }

  ngOnInit(): void {
    this.getMenuItems();
  }

  // public navigateToGallery({sref}: any, child: any) {
  //   this.router.navigate(['/gallery'], {data: {parent: sref, child: child}});
  // }

  private getMenuItems() {
    this.menuSerivce$.getGalleryMenuItems().subscribe(({ menuItems }) => {
      this.galleryMenuItems = menuItems;
      console.log(this.galleryMenuItems);
    })
  }

}
