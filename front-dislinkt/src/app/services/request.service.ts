import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
  )
  {}

  get_requests(id: number): Observable<User[]>{
    return this.http.get(`${environment.profileUrl}/requests/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  accept_request(id1: number, id2: number): Observable<any>{
    return this.http.get(`${environment.profileUrl}/requests/${id1}/${id2}`).pipe(
      catchError(() => of(null))
    );
  }
  
  
}
