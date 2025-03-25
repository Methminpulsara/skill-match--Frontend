import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { CompanyComponent } from './page/company/company.component';
import { EmployeeDashboardComponent } from './page/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './page/employee/employee-profile/employee-profile.component';



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
    path:"companydashboard",
    component:CompanyComponent
  },{
    path:"employee-dashboard",
    component:EmployeeDashboardComponent,
    children:[
      {
        path:"profile",
        component:EmployeeProfileComponent
      }
    ]
  },

];

