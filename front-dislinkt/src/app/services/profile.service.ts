import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment1 } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { catchError, map } from 'rxjs/operators';
import {of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private readonly API_PROFIL: string = `${environment1.baseUrl}/${environment1.apiProfil}`;

  constructor(
    private http: HttpClient, 
  ) { }


  createProfile(profile: Profile) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let profilejson = JSON.stringify(profile);
    console.log(profilejson);
    return this.http.post<Profile>(this.API_PROFIL, profilejson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }


  getProfile(id: number) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.API_PROFIL}/${id}`, {headers: headers}).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      }
    ));
    
  }


  editProfile(profile: Profile) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let profilejson = JSON.stringify(profile);
    console.log(profilejson);
    return this.http.put<Profile>(`${this.API_PROFIL}/edit/${profile.id}`, profilejson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }

}
