import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { CompanyComponent } from './page/company/company.component';
import { EmployeeDashboardComponent } from './page/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './page/employee/employee-profile/employee-profile.component';
import { SikllComponent } from './page/employee/sikll/sikll.component';
import { CareerGrowthComponent } from './page/employee/career-growth/career-growth.component';
import { TraingprogramsComponent } from './page/employee/traingprograms/traingprograms.component';
import { CompanyEmployeesComponent } from './page/company/company-employees/company-employees.component';
import { DepartmentsComponent } from './page/company/departments/departments.component';
import { TrainingsComponent } from './page/company/trainings/trainings.component';
import { DashComponent } from './page/company/dash/dash.component';
import { InternaliJobBoardComponent } from './page/company/internali-job-board/internali-job-board.component';
import { LandingpageComponent } from './page/landingpage/landingpage.component';
import { EmployeeRegisterComponent } from './page/employee/employee-register/employee-register.component';
import { CompanyRegisterComponent } from './page/company/company-register/company-register.component';



export const routes: Routes = [
  {
    path:"",
    component: LandingpageComponent
  },{
    path:"login",
    component:LoginComponent
  },{
    path:"employee-signup",
    component:EmployeeRegisterComponent
  },{
    path:"company-signup",
    component:CompanyRegisterComponent
  },{
    path:"company-dashboard",
    component:CompanyComponent,
    children:[{
        path:"",
        component:DashComponent      
      },{
        path:"employees",
        component:CompanyEmployeesComponent
      },{
        path:"departments",
        component:DepartmentsComponent
      },{
        path:"training",
        component:TrainingsComponent
      },{
        path:"projects",
        component:InternaliJobBoardComponent
      }
    ]
  },
  {
    path:"employee-dashboard",
    component:EmployeeDashboardComponent,
    children:[
      {
        path:"profile",
        component:EmployeeProfileComponent
      },{
        path:"skills",
        component:SikllComponent
      },{
        path:"career",
        component:CareerGrowthComponent
      },{
        path:"trainingprograms",
        component:TraingprogramsComponent
      }
    ]
  },

];

