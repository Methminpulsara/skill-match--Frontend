import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SingInComponent } from './page/sing-in/sing-in.component';



export const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },{
    path:"login",
    component: LoginComponent
  },
  {
    path:"singin",
    component: SingInComponent
  }
];

