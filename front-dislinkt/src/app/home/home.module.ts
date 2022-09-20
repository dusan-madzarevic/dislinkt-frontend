import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from '../layout/layout.module';
import { AppModule } from '../app.module';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EducationDialog, PasswordDialog, ProfileComponent, SkillDialog } from './profile/profile.component';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { HomeRoutingModule } from './home-routing.module';
import { Profile2Component } from './profile2/profile2.component';
import { RequestsComponent } from './requests/requests.component';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    CreatePostComponent,
    ProfileComponent,
    EducationDialog,
    PostsViewComponent,
    SkillDialog,
    PasswordDialog,
    Profile2Component,
    RequestsComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    HomeRoutingModule

  ]
})
export class HomeModule { }
