import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PostCreate } from '../models/postcreate';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly API_POST: string = `${environment.postUrl1}/${environment.apiPost}`;

  addPost(post: PostCreate): Observable<any> {
    return this.http.post(`${this.API_POST}`, post).pipe(map((data: any) => {
      return data;
    }));
  }
  
  fetchPosts(): Observable<any> {
    return this.http.get(`${this.API_POST}`).pipe(map((data: any) => {
      return data;
    }));
  }

  fetchUserPosts(user_id: number): Observable<any> {
    return this.http.get(`${this.API_POST}/${user_id}`).pipe(map((data: any) => {
      return data;
    }));
  }


  fetchFollowerPosts(profile_id): Observable<any> {
    return this.http.get(`${this.API_POST}/following/${profile_id}`).pipe(map((data: any) => {
      return data;
    }));
  }

}
