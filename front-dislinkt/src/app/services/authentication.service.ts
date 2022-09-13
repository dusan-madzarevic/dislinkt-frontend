import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_REG: string = `${environment.baseUrl}/${environment.apiReg}`;
  private readonly API_LOGIN: string = `${environment.baseUrl}/${environment.apiLogin}`;

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

  login(formGroup: FormGroup) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })

    let formData = new FormData();
    console.log(formGroup.controls)
    formData.append('username', formGroup.controls['email'].value)
    formData.append('password', formGroup.controls['password'].value)
    formData.append('grant_type', formGroup.controls['grant_type'].value)
    formData.append('scope', formGroup.controls['scope'].value)
    formData.append('client_id', formGroup.controls['client_id'].value)
    formData.append('client_secret', formGroup.controls['client_secret'].value)


    return this.http.post(this.API_LOGIN, formData)
        .subscribe((res:any)=>{
          this.setSession(res);
        })
  }
      
private setSession(authResult) {
    let expireTime = DateTime.now().plus({minutes: authResult.expires_in_minutes})
    
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem("expires_at", JSON.stringify(expireTime.toMillis()));
}          

logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
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
