import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import {Location} from "@angular/common";
// import { LoginComponent } from '../login/login.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  // let router: Router;
  // let location: Location;

  beforeEach(async () => {
    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // const loginSpy = jasmine.createSpyObj('LoginComponent', ['login']);
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, MatDialogModule, MatSnackBarModule ],
      // providers: [
      //   {provide: LoginComponent, useValue: loginSpy}, {provide: Router, useValue: routerSpy}
      // ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    // router = TestBed.get(Router);
    // location = TestBed.get(Location);
    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login redirects you to /login', fakeAsync(() => { 
    // router.navigate(['login']);
    // component.login();
    // tick();

    // const spy = router.navigate as jasmine.Spy;
    // const navArgs = spy.calls.first().args[0];

    // expect(location.path()).toBe('/login');

  }));


});
