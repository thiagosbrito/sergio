import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuResponse } from '../interfaces/menu.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public getGalleryMenuItems(): Observable<MenuResponse> {
    return this.http.get<MenuResponse>('http://sergiorighini.com/2016/webservices.php?__action=menu_itens');
  }

}
