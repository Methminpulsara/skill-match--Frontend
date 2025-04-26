import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';
import EmployeeService from '../../../../service/EmployeeService';
import Employee from '../../../model/Employee';
import { CompanyService } from '../../../../service/CompanyService';
import Company from '../../../model/Company';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
})
export class EmployeeProfileComponent implements OnInit {

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
   employeeEmail = '';

   public company:Company={
         companyId: 0,
         name: "",
         industry: "",
         size: "",
         status: "active",
         profileImage: "",
         userId: 0
       }

  constructor(
    private userSerivce:UserService,
    private employeeService:EmployeeService,
    private companyService:CompanyService
  ){}

  isImageModalOpen: boolean = false; 
  imageUrl: string = '';


  ngOnInit(): void {
    const employee = this.employeeService.getEmployee();
    if(employee){
      this.employee=employee;
      this.getCompanyDetails(this.employee.companyId);
    }else{
      console.log("user not found");
    }

  }


  getCompanyDetails(companyId:number){
    this.companyService.findByID(companyId).subscribe(res => {
     this.company=res;
    });
  }



  openImageModal() {
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
  }

  updateProfileImage() {
   console.log(this.imageUrl)
    this.closeImageModal();
   
  }

}


