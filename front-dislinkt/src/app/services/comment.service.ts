import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommentCreate } from '../models/comentcreate';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
  ) 
  { }

  readonly API_COMMENT: string = `${environment.postUrl1}/${environment.apiComment}`;

  fetchCommentsForPost(postId: number): Observable<any> {
    return this.http.get(`${this.API_COMMENT}/${postId}`).pipe(map((data: any) => {
      return data;
    }));
  }

  addComment(comment: CommentCreate): Observable<any> {
    return this.http.post(`${this.API_COMMENT}`, comment).pipe(map((data: any) => {
      return data;
    }));
  }

}
