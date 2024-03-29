import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostsViewComponent } from './posts-view/posts-view.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent , PostsViewComponent],
      imports: [ HttpClientTestingModule, RouterTestingModule, MatDialogModule, MatSnackBarModule ,
        RouterTestingModule.withRoutes(
          [{path: 'posts', component: PostsViewComponent}],
        )]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login redirects you to /login', fakeAsync(() => { 

  }));


});
