import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public getGalleryMenuItems(): Observable<any> {
    return this.http.get('http://sergiorighini.com/2016/webservices.php?__action=menu_itens');
  }
}
