import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Reaction } from '../models/reaction';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly API_REACTION: string = `${environment.postUrl1}/${environment.apiReaction}`;

  fetchReactionsForPost(postId: number): Observable<any> {
    return this.http.get(`${this.API_REACTION}/${postId}`).pipe(map((data: any) => {
      return data;
    }));
  }

  checkUserInReactions(user_id: number, reactions: Reaction[]): Reaction {
    for (var i = 0; i < reactions.length; i++) {
      if(reactions[i].user_id == user_id)
        return reactions[i]
    }
    return null
  }

  addReaction(reaction: Reaction): Observable<any> {
    return this.http.post(`${this.API_REACTION}`, reaction).pipe(map((data: any) => {
      return data;
    }));
  }
}
