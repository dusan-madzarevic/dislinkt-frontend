import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
import { FormGroup } from '@angular/forms';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_REG: string = `${environment.baseUrl}/${environment.apiReg}`;
  private readonly API_LOGIN: string = `${environment.baseUrl}/${environment.apiLogin}`;
  private readonly API_USER: string = `${environment.baseUrl}/${environment.apiUser}`;

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

  login(formData: FormData): Observable<Token>{
    return this.http.post<Token>(this.API_LOGIN, formData).pipe(
      catchError(() => of(null))
    );
  }

  setLoggedUser() {
    return this.http.get(this.API_USER)
        .subscribe((res:any)=>{
          console.log(res);
          localStorage.setItem('user', res);
        })
  }


      
public setSession(authResult) {
    let expireTime = DateTime.now().plus({minutes: authResult.expires_in_minutes})
    
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expireTime.toMillis()));
}          

logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
}

public isLoggedIn() {
  const expiration = localStorage.getItem("expires_at");
  if(expiration != null){
    return DateTime.now() < DateTime.fromMillis(JSON.parse(expiration));
  }else{
    return false;
  }
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getToken(){
  return localStorage.getItem("access_token");
}

getUser(){
  return localStorage.getItem("user");
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(expiration != null){
      const expiresAt = JSON.parse(expiration);  
      return DateTime.fromMillis(expiresAt);
    }else{
      return "error";
    }
} 

}
