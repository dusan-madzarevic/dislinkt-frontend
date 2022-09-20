import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly API_IMAGE: string = `${environment.postUrl1}/${environment.apiImage}`;
  readonly API_UPLOAD_POST: string = `${environment.postUrl1}/images`;


  getImage(path: string): Observable<Blob> {
    return this.http.get(`${this.API_IMAGE}/${path}`, { responseType: 'blob' });
  }
  
  uploadImage(formdata: FormData): Observable<any> {
    return this.http.post(`${this.API_UPLOAD_POST}`, formdata).pipe(map((data: any) => {
      return data;
    }));;
  }
}
