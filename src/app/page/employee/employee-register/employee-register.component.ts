import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import EmployeeService from '../../../../service/EmployeeService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Employee from '../../../model/Employee';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import UserService from '../../../../service/UserService';

@Component({
  selector: 'app-employee-register',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent {

  nextPageNumber:number=1;
  comfirmPassword:string='';

  public employee:Employee={
    employeeID:0,
    name:'',
    phoneNumber:'',
    location:'',
    position:'',
    profileImage:'',
    department:'',
    userId:0,
    companyId:0
  }
   public user:User={
     userId:1,
     email:'',
     password:'',
     role:RoleType.EMPLOYEE
   }


  constructor(private userService:UserService,private employeeService:EmployeeService){}


  nextPageOnAction(page:number){
    this.nextPageNumber=page;
  }

  registerEmployee(){

    this.userService.register(this.user).subscribe(res=>{
      console.log(res.userId);
    })

  }


}
