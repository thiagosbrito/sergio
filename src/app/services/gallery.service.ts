import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../constants/api.constant';
import { IBannersResponse, IGalleryResponse } from '../interfaces/gallery.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http: HttpClient) { }

  getGalleryImages(parentId: string, childId: string, currentPage: string): Observable<IGalleryResponse> {
    return this.http.get(`${API_BASE_URL}${'imgs_'+parentId}&cod=${childId}&pag=${currentPage}`).pipe(
      map((result: any) => result[`imgs_${parentId}`])
    );
  }

  getHomeBackgroundImages(): Observable<IBannersResponse> {
    return this.http.get<IBannersResponse>(`${API_BASE_URL}banners_home`);
  }
}
