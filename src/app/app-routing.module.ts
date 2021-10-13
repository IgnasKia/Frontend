import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "users", component: UsersComponent, canActivate: [AuthGuard]},
  {path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
