import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/api.constant';


@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) { }

  getPagesContent<T>(page: string): Observable<T>{
    return this.http.get<T>(`${API_BASE_URL}${page}`)
  }

}
