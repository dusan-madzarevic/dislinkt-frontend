import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Follow } from '../models/follow';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly API_FOLLOW: string = `${environment.profileUrl}/${environment.apiFollow}`;

  checkFollow(id1: number, id2: number): Observable<any> {
    return this.http.get(`${this.API_FOLLOW}/${id1}/${id2}`).pipe(map((data: any) => {
      return data;
    }));
  }

  follow(id1: number, id2: number): Observable<any> {
    const follow = {} as Follow;
    follow.follower_id = id1;
    follow.following_id = id2;
    follow.accepted = false;
    return this.http.post(`${this.API_FOLLOW}`, follow).pipe(map((data: any) => {
      return data;
    }));
  }

  unfollow(id1: number, id2: number): Observable<any> {
    return this.http.delete(`${this.API_FOLLOW}/${id1}/${id2}`).pipe(map((data: any) => {
      return data;
    }));
  }


  
}
