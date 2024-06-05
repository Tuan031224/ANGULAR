import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  Url = 'http://localhost:3000/product';
constructor(private httpService: HttpClient) { }
  getData(): Observable<any> {
    return this.httpService.get<any>(this.Url);
  }
}