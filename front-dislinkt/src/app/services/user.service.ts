import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment, environment1 } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  search_users(name: string): Observable<User[]>{
    return this.http.get(`${environment1.baseUrl}/profile/${name}`).pipe(
      catchError(() => of(null))
    );
  }
}
