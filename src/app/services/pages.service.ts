import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) { }

  getPagesContent<T>(page: string): Observable<T>{
    return this.http.get<T>(`http://sergiorighini.com/2016/webservices.php?__action=${page}`)
  }

}
