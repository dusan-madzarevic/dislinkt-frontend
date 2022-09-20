import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DateTime } from 'luxon';
import { Token } from '../models/token';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly API_REG: string = `${environment.postUrl}/${environment.apiReg}`;
  private readonly API_LOGIN: string = `${environment.postUrl}/${environment.apiLogin}`;
  private readonly API_USER: string = `${environment.postUrl}/${environment.apiUser}`;
  private readonly API_USERS: string = `${environment.postUrl}/${environment.apiUsers}`;
  readonly STORAGE_KEY = 'auth';
  readonly PROFILE_KEY = 'profile';


  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    // private jwtUtilsService: JwtUtilsService, 
    // private jwtHelper : JwtHelperService
  ) { }


  // public signup(user: User) {
  //   var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.post<User>(this.API_REG, JSON.stringify(user), {headers}).pipe(
  //     map((res: any) => { return true; })).pipe(
  //       catchError((error: any) => {return throwError('Not created'); }));
  // }

  signup(user: User) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let userjson = JSON.stringify(user);
    console.log(userjson);
    return this.http.post<User>(this.API_REG, userjson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }

  login(formData: FormData): Observable<Token>{
    return this.http.post<Token>(this.API_LOGIN, formData).pipe(
      catchError(() => of(null))
    );
  }

  getLoggedUser(): Observable<User> {
    // return this.http.get(this.API_USER)
    //     .subscribe((res:any)=>{
    //       console.log(res);
    //       localStorage.setItem('user', JSON.stringify(res));
    //     })
    return this.http.get(`${this.API_USER}`).pipe(
      catchError(() => of(null))
    );
  }

  setLoggedUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
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
    return JSON.parse(localStorage.getItem("user"));
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


  editUser(user: User){
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let userjson = JSON.stringify(user);
    console.log(userjson);
    return this.http.put<User>(`${this.API_USERS}/${user.id}`, userjson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }


  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['green-snackbar'],
      duration: 4000,
    });
  }
  openFailSnackBar(message = 'Something went wrong.'): void {
    this.snackBar.open(message, 'Dismiss', {
      verticalPosition: 'top',
      panelClass: ['red-snackbar']
    });
  }


  saveUser(profile: User): void{
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));

  }
  saveToken(token: Token): void{
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(token));
  }

  deleteUser(): void{
    console.log(localStorage);
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.PROFILE_KEY);
  }

  // getUser(): User{
  //   return JSON.parse(localStorage.getItem(this.PROFILE_KEY));
  // }

}
