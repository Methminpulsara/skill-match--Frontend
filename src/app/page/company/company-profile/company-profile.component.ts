import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import Company from '../../../model/Company';


@Component({
  selector: 'app-company-profile',
  imports: [],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css'
})
export class CompanyProfileComponent implements OnInit {

  constructor(
    private userService:UserService,
    private companyService:CompanyService

  ){}
  

    companyEmail ="";

    public company:Company={
      companyId: 0,
      name: "",
      industry: "",
      size: "",
      status: "active",
      profileImage: "",
      userId: 0
    }

  ngOnInit(): void {

    const user = this.userService.getUser();
    if(user){
      this.companyEmail = user.email
      this.getCompanyDetails(user.userId);
    }

  }
  getCompanyDetails(userId: number) {
   
    this.companyService.findByUserID(userId).subscribe(res => {
      this.company=res;
    });

    
  }


}
