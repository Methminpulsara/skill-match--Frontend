import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Company from '../../model/Company';
import { CompanyService } from '../../../service/CompanyService';

@Component({
  selector: 'app-company',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {

  constructor(private companyService:CompanyService){}

  ngOnInit(): void {
    const company= this.companyService.getCompany();
    if(company){this.company=company}
  }

  public company:Company={
    companyId: 0,
    name: "",
    industry: "",
    size: "",
    status: "active",
    profileImage: "",
    userId: 0,
    about:"",
    location:'',
    contact:""
  }
}
