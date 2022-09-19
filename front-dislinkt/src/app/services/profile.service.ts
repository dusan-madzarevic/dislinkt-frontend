import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment1 } from 'src/environments/environment';
import { Profile } from '../models/profile';
import { catchError, map } from 'rxjs/operators';
import {of } from 'rxjs';
import { Education } from '../models/education';
import { Skill } from '../models/skill';
import { PasswordChange } from '../models/password-change';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private readonly API_PROFIL: string = `${environment1.baseUrl}/${environment1.apiProfil}`;
  private readonly API_USER: string = `${environment1.baseUrl}/user`;

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


  addEducation(education: Education) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let educationjson = JSON.stringify(education);
    console.log(educationjson);
    return this.http.post<Education>(`${this.API_PROFIL}/addEducation`, educationjson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }


  getEducation(profile_id: number) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.API_PROFIL}/${profile_id}/education`, {headers: headers}).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      }
    ));
  }

  deleteEducation(education_id: string) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.API_PROFIL}/education/${education_id}`).pipe(
      catchError(() => of(null))
    );
  }


  addSkill(skill: Skill) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let skilljson = JSON.stringify(skill);
    console.log(skilljson);
    return this.http.post<Skill>(`${this.API_PROFIL}/skills`, skilljson, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }

  getSkills(profile_id: number) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.API_PROFIL}/${profile_id}/skills`, {headers: headers}).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      }
    ));
  }

  deleteSkill(skill_id: string) {
    return this.http.delete(`${this.API_PROFIL}/skills/${skill_id}`).pipe(
      catchError(() => of(null))
    );
  }

  changePassword(password: PasswordChange) {
    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let passwordjson = JSON.stringify(password);
    console.log(passwordjson);
    return this.http.post<PasswordChange>(`${this.API_USER}/password`, password, {headers: headers}).pipe(
      catchError(() => of(null))
    );
  }

}
