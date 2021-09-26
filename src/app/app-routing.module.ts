import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
