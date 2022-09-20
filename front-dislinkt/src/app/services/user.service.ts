import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  readonly API_AUTH: string = `${environment.profileUrl}/${environment.apiAuth}`;
  readonly API_USER: string = `${environment.postUrl1}/user`


  login(formData: FormData): Observable<Token>{
    return this.http.post<Token>(`${this.API_AUTH}/token`, formData).pipe(
      catchError(() => of(null))
    );
  }

  get_User(): Observable<User>{
    // return this.http.get(`${this.API_AUTH}/users/me`).pipe(
      return this.http.get(`${environment.profileUrl}/${environment.apiUser}`).pipe(
        catchError(() => of(null))
    );
  }

  get_User_id(id: number): Observable<any>{
    return this.http.get(`${this.API_USER}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  search_users(name: string): Observable<User[]>{
    return this.http.get(`${environment.profileUrl}/profiles/${name}`).pipe(
      catchError(() => of(null))
    );
  }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.API_AUTH}/register`, user).pipe(
      catchError(() => of(null))
    );
  }
}
