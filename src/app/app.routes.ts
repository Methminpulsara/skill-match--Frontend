import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { CompanyComponent } from './page/company/company.component';
import { EmployeeDashboardComponent } from './page/employee-dashboard/employee-dashboard.component';



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
  },{
    path:"companydashborad",
    component:CompanyComponent
  },{
    path:"employeedashborad",
    component:EmployeeDashboardComponent
  }
];

