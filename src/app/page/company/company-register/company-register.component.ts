import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import Company from '../../../model/Company';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';

@Component({
  selector: 'app-company-register',
  imports: [FormsModule ,CommonModule,NgIf],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {

constructor(private userService:UserService){}

nextpagenumber:number=1;
savedUserID:number=0;

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
    profileImage: "",
    userId: 0,

  }


nextButtonOnAction(page:number){
  this.nextpagenumber=page;
}



  register() {
    this.userService.register(this.user).subscribe(res => {
      console.log(res.userId); 

      this.company.userId=res.userId;
      console.log(this.company);

    });
  }
  
  
}
