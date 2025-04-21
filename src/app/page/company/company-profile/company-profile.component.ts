import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';

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

  ngOnInit(): void {

    const user = this.userService.getUser();
    if(user){
      this.getCompanyDetails(user.userId);
    }

  }
  getCompanyDetails(userId: number) {
   
    

  }


}
