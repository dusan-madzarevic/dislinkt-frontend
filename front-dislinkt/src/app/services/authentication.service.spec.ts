import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { Token } from '@angular/compiler';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule ]
    });
    service = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#signup should perform a signup', fakeAsync(() => {
    let user : User = {
      email: "admin@gmail.com", 
      username: "admin", 
      password: "123",
      ime: "Ime",
      prezime: "Prezime",
      telefon: "123456",
      datumRodjenja: "1999-01-07",
      pol: "z"
    };

    let mockUser = {
      email: "admin@gmail.com", 
      username: "admin", 
      password: "123",
      ime: "Ime",
      prezime: "Prezime",
      telefon: "123456",
      datumRodjenja: "1999-01-07",
      pol: "z"
    }

    let res: boolean = false;

    service.signup(user).subscribe(response => {
      res = response;
    });

    const req = httpTestingController.expectOne('http://localhost:8001/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);

    tick();

    expect(res).toBeTruthy();
  }));

  it('#login should perform a post to /auth with email and password', fakeAsync(() => {
    // let formData : FormData = {
      
    // }

    // let res: Token;

    // service.login(formData).subscribe(response => {
    //   res = response;
    // });

    // const req = httpTestingController.expectOne('https://localhost:8081/token');
    // expect(req.request.method).toBe('POST');
    // req.flush(formData);

    // tick();

    // expect(res).toBeTruthy();
  }));

  it('#getUser should return current user', fakeAsync(() => {
    
  }));

});
