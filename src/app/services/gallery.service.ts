import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBannersResponse } from '../interfaces/gallery.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  getGalleryImages(parentId: string, childId: string, currentPage: string): Observable<any> {
    return this.http.get(`http://sergiorighini.com/2016/webservices.php?__action=${'imgs_'+parentId}&cod=${childId}&pag=${currentPage}`).pipe(
      map((result: any) => result[`imgs_${parentId}`])
    );
  }

  getHomeBackgroundImages(): Observable<IBannersResponse> {
    return this.http.get<IBannersResponse>(`http://sergiorighini.com/2016/webservices.php?__action=banners_home`);
  }
}
