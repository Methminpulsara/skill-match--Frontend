import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../service/CompanyService';
import EmployeeService from '../../../../service/EmployeeService';
import Employee from '../../../model/Employee';
import Company from '../../../model/Company';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-profile',
  imports:[FormsModule,CommonModule],
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
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
  };

  employeeEmail = '';

  public company: Company = {
    companyId: 0,
    name: "",
    industry: "",
    size: "",
    status: "active",
    profileImage: "",
    userId: 0,
    location:"",
    about:"",
    contact:""
  };

  isImageModalOpen: boolean = false;
  imageUrl: string = '';

  constructor(
    private employeeService: EmployeeService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    const employee = this.employeeService.getEmployee();
    if (employee) {
      this.employee = employee;
      this.getCompanyDetails(this.employee.companyId);
    } else {
      console.log("user not found");
    }
  }

  getCompanyDetails(companyId: number) {
    this.companyService.findByID(companyId).subscribe(res => {
      this.company = res;
    });
  }

  openImageModal() {
    this.isImageModalOpen = true;
  }

  closeImageModal() {
    this.isImageModalOpen = false;
  }

  updateProfileImage() {
    if (this.imageUrl) {
      this.employeeService.updateImage(this.employee.employeeId, this.imageUrl).subscribe(res => {
        console.log(res.profileImage); // Log the updated profile image URL
        this.employee.profileImage = res.profileImage;

        console.log('Updated profile image:', this.employee.profileImage);

        // Update the employee object in the service
        this.employeeService.setEmployee(this.employee);

        // Save the updated employee object to localStorage
        localStorage.setItem('employee', JSON.stringify(this.employee));
      });

      this.closeImageModal();
    } else {
      console.error('Image URL is empty!');
    }
  }
}
