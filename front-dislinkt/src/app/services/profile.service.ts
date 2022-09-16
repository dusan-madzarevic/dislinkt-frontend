import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment1 } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private readonly API_PROFIL: string = `${environment1.baseUrl}/${environment1.apiProfil}`;

  constructor(
    private http: HttpClient, 
  ) { }


  createProfile(profile: Profile) {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    var profilejson = JSON.stringify(profile);
    console.log(profilejson);
    return this.http.post<Profile>(this.API_PROFIL, profilejson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }

}
