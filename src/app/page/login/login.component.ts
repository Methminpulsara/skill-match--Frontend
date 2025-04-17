import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterModule } from '@angular/router';
import User from '../../model/User';
import { RoleType } from '../../../utils/Role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {



  email:string = "";
  password:string = "";


  login(){
    console.log("clicked")
    console.log(this.email);
    console.log(this.password);
    
  }




}
