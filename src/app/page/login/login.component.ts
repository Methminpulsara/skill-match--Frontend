import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterModule } from '@angular/router';
import User from '../../model/User';
import { RoleType } from '../../../utils/Role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import UserService from '../../../service/UserService';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private userService:UserService) { }

 public user:User={
    userId:1,
    email:"",
    password:"",
    role:RoleType.COMPANY
  }


  loginRequest() {
    
    let logeduserID:number=1;

    if (this.isValidEmail(this.user.email) && this.user.password.trim() !== '') {


      alert("✅ Proceeding with login...");
      this.userService.loginRequest(this.user).subscribe({
        next:(res)=>{
          console.log("login sussecfully");
       
          logeduserID=res.userId;

          if(res.role==RoleType.COMPANY){
            console.log(res.userId)
            
          }else if(res.role==RoleType.EMPLOYEE){
            console.log(res.userId)
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




}
