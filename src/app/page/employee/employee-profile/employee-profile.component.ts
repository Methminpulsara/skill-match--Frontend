import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../service/CompanyService';
import EmployeeService from '../../../../service/EmployeeService';
import Employee from '../../../model/Employee';
import Company from '../../../model/Company';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import UserService from '../../../../service/UserService';

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

  public updatedemployee = {
    name: '',
    position:'',
    phoneNumber: '',
    location: '',
  };


  isImageModalOpen: boolean = false;
  isUpdateModalOpen:boolean=  false;
  imageUrl: string = '';

  constructor(
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private userService :UserService
  ) {}

  ngOnInit(): void {


    const employee = this.employeeService.getEmployee();
    if (employee) {
      this.employee = employee;
      console.log("localstorage" + employee.name)
      this.getCompanyDetails(this.employee.companyId);
    } else {
      console.log("user not found");
    }
  }


  getEmployeeDetails(userId:number){
    this.employeeService.findByUserID(userId).subscribe((res) => {
     console.log (res);
    });
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
  openUpdateModel(){

    this.updatedemployee.name=  this.employee.name
    this.updatedemployee.phoneNumber =this.employee.phoneNumber
    this.updatedemployee.location = this.employee.location
    this.updatedemployee.position = this.employee.position
    this.isUpdateModalOpen= true;
  }
  closeUpdateModal(){
    this.isUpdateModalOpen=false;
  }


  updateProfile(){

    const updatedEmployee : Employee ={
        ...this.employee,
        name:this.updatedemployee.name ? this.updatedemployee.name.trim() : '',
        phoneNumber:this.updatedemployee.phoneNumber ? this.updatedemployee.phoneNumber.trim() : '',
        position:this.updatedemployee.position ? this.updatedemployee.position.trim() : '',
        location:this.updatedemployee.location ? this.updatedemployee.location.trim() : ''

    };
    this.employeeService.update(this.employee.employeeId, updatedEmployee).subscribe(
      res => {
        console.log('Employee updated successfully:', res);
        this.employee = res;
        this.employeeService.setEmployee(this.employee);
        this.closeUpdateModal();
      },
      error => {
        console.error('Failed to update Employee profile:', error);
      }
    );

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
