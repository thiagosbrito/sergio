import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuResponse } from '../interfaces/menu.interfaces';
import { API_BASE_URL } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public getGalleryMenuItems(): Observable<MenuResponse> {
    return this.http.get<MenuResponse>(API_BASE_URL + 'menu_itens');
  }

}
