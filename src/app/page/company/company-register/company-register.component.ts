import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import Company from '../../../model/Company';

@Component({
  selector: 'app-company-register',
  imports: [FormsModule ,CommonModule],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {

public user:User={
  userID:0,
  email:'',
  password:'',
  role:RoleType.COMPANY
  }

  public company:Company={
    companyId: 0,
    name: "",
    industry: "",
    location: "",
    size: "",
    profileImage: "",
    userId: this.user.userID,

  }

  register(){
    console.log(this.company);
    
  }

}
