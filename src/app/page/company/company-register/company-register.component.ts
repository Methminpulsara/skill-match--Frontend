import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import Company from '../../../model/Company';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-company-register',
  standalone: true,
  imports: [FormsModule ,CommonModule,NgIf,RouterModule],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {

constructor(
  private userService:UserService,private companyService:CompanyService,private router: Router){}

nextpagenumber:number=1;
savedUserID:number=0;
comfirmPassword:string='';

  public user:User={
    userId:1,
    email:'',
    password:'',
    role:RoleType.COMPANY
  }

  public company:Company={
    companyId: 0,
    name: "",
    industry: "",
    size: "",
    status: "active",
    profileImage: "",
    userId: 0
  }

nextButtonOnAction(page:number){
  this.nextpagenumber=page;
}
  register() {

   if(this.comfirmPassword === this.user.password)
    {
        this.userService.register(this.user).subscribe(res => {
        this.savedUserID=res.userId;
        this.company.userId=this.savedUserID;
        this.registerCompany();
      });
    }else{
      alert('password does not match');
    }
  }
  registerCompany() {
    this.companyService.create(this.company).subscribe(res => {
      console.log('user registered');
      alert("Company Was Registerd !")
      
      setTimeout(() => {
        this.router.navigate(['/company-dashboard']);
      }, 1000);
    });
  }
}
