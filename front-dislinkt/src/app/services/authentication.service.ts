import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_REG: string = `${environment.baseUrl}/${environment.apiReg}`;

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient, 
    // private jwtUtilsService: JwtUtilsService, 
    // private jwtHelper : JwtHelperService
  ) { }


  public signup(user: User) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.API_REG, JSON.stringify(user), {headers}).pipe(
      map((res: any) => { return true; })).pipe(
        catchError((error: any) => {return throwError('Not created'); }));
  }
}
