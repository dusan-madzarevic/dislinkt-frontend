import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from '../layout/layout.module';
import { AppModule } from '../app.module';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    PostComponent,
    CreatePostComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
  ]
})
export class HomeModule { }
