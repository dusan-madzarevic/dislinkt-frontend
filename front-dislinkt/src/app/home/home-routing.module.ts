import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POST_PATH, PROFILES_PATH, PROFILE_PATH } from '../constants/routes';
import { HomeComponent } from './home.component';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { Profile2Component } from './profile2/profile2.component';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: POST_PATH,
        component: PostsViewComponent
      },
      {
        path: PROFILE_PATH,
        component: ProfileComponent
      },
      {
        path: `${PROFILE_PATH}/edit`,
        component: ProfileEditComponent
      },
      {
        path: `${PROFILES_PATH}/:id`,
        component: Profile2Component
      },
      {
        path: "requests",
        component: RequestsComponent
      }

    ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
