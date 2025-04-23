import { Component, OnInit } from '@angular/core';
import {  Router, RouterLink, RouterModule } from '@angular/router';
import User from '../../model/User';
import { RoleType } from '../../../utils/Role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import UserService from '../../../service/UserService';
import EmployeeService from '../../../service/EmployeeService';
import { CompanyService } from '../../../service/CompanyService';
import Employee from '../../model/Employee';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(
    private router:Router,
    private userService:UserService,
    private employeeService:EmployeeService,
    private companyService:CompanyService
  ) { }

 public user:User={
    userId:1,
    email:"",
    password:"",
    role:RoleType.COMPANY
  }


    public employee: Employee = {
      employeeId: 1,
      name: '',
      phoneNumber: '',
      location: '',
      position: '',
      profileImage: '',
      department: '',
      userId: 0,
      companyId: 0
    }


  loginRequest() {


    if (this.isValidEmail(this.user.email) && this.user.password.trim() !== '') {


      alert("✅ Proceeding with login...");
      this.userService.loginRequest(this.user).subscribe({
        next:(res)=>{
          console.log("login sussecfully");


          //store login user
          this.userService.setUser(res);



          if(res.role==RoleType.COMPANY){
            console.log("company login")
            this.router.navigate(['/company-dashboard']);

          }else if(res.role==RoleType.EMPLOYEE){


            this.getEmployeeDetails(res.userId)


            console.log("employee login")

            this.router.navigate(['/employee-dashboard']);
          }


        },
        error:(err)=>{alert("An unexpected error occurred. Please check your input or try again.");}
      })
    } else {
     alert(" Email or password is invalid");
    }
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }


  getEmployeeDetails(userId:number){
    this.employeeService.findByUserID(userId).subscribe(res => {
     this.employeeService.setEmployee(res);
    });
  }




}
