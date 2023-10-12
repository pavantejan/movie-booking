import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-components/login/login.component';
import { RegistrationComponent } from './user-components/registration/registration.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "**", redirectTo: "/login" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
