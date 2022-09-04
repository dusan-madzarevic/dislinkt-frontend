import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly API_POST: string = `${environment.baseUrl}/${environment.apiPost}`;

  fetchPosts(): Observable<any> {
    return this.http.get(`${this.API_POST}`).pipe(map((data: any) => {
      return data;
    }));
  }

}
