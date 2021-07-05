import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  getGalleryImages(type: string, id: string, currentPage: string): Observable<any> {
    return this.http.get(`http://sergiorighini.com/2016/webservices.php?__action=${'imgs_'+type}&cod=${id}&pag=${currentPage}`).pipe(
      map((result: any) => result[`imgs_${type}`])
    );
  }
}
