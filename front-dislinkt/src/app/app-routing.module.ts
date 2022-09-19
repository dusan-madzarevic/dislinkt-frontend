import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HOME_PATH, LOGIN_PATH, PROFILE_PATH, REGISTER_PATH } from './constants/routes';
import { HomeComponent } from './home/home.component';
import { ProfileEditComponent } from './home/profile-edit/profile-edit.component';
import { ProfileComponent } from './home/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: HOME_PATH,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: LOGIN_PATH,
    component: LoginComponent
  },
  {
    path: REGISTER_PATH,
    component: RegisterComponent
  },
  // {
  //   path: PROFILE_PATH,
  //   component: ProfileComponent
  // },
  // {
  //   path: PROFILE_PATH+"/edit",
  //   component: ProfileEditComponent
  // },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: HOME_PATH
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
