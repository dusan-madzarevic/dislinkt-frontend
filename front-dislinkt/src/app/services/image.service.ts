import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly API_IMAGE: string = `${environment.postUrl1}/${environment.apiImage}`;


  getImage(path: string): Observable<Blob> {
    return this.http.get(`${this.API_IMAGE}/${path}`, { responseType: 'blob' });
  }
  
}
