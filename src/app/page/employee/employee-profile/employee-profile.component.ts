import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../service/CompanyService';
import EmployeeService from '../../../../service/EmployeeService';
import Employee from '../../../model/Employee';
import Company from '../../../model/Company';
import UserService from '../../../../service/UserService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Notyf } from 'notyf';
import Swal from 'sweetalert2';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
    location: "",
    about: "",
    contact: ""
  };

  public updatedemployee = {
    name: '',
    position: '',
    phoneNumber: '',
    location: ''
  };

  isImageModalOpen: boolean = false;
  isUpdateModalOpen: boolean = false;
  imageUrl: string = '';

  private notyf: Notyf;

  constructor(
    private employeeService: EmployeeService,
    private companyService: CompanyService,
    private userService: UserService
  ) {
    this.notyf = new Notyf({
      types: [
        { type: 'success', background: '#4CAF50', duration: 3000 },
        { type: 'error', background: '#F44336', duration: 3000 },
        { type: 'info', background: '#2196F3', duration: 3000 }
      ]
    });
  }

  ngOnInit(): void {
    const employee = this.employeeService.getEmployee();
    if (employee) {
      this.employee = employee;
      this.getCompanyDetails(this.employee.companyId);
    } else {
      this.notyf.error("Employee not found in local storage.");
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

  openUpdateModel() {
    this.updatedemployee.name = this.employee.name;
    this.updatedemployee.phoneNumber = this.employee.phoneNumber;
    this.updatedemployee.location = this.employee.location;
    this.updatedemployee.position = this.employee.position;
    this.isUpdateModalOpen = true;
  }

  closeUpdateModal() {
    this.isUpdateModalOpen = false;
  }

  updateProfile() {
    const updatedEmployee: Employee = {
      ...this.employee,
      name: this.updatedemployee.name?.trim() || '',
      phoneNumber: this.updatedemployee.phoneNumber?.trim() || '',
      position: this.updatedemployee.position?.trim() || '',
      location: this.updatedemployee.location?.trim() || ''
    };

    this.employeeService.update(this.employee.employeeId, updatedEmployee).subscribe(
      res => {
        this.employee = res;
        this.employeeService.setEmployee(this.employee);
        this.notyf.success('Employee profile updated successfully.');
        this.closeUpdateModal();
      },
      error => {
        console.error('Failed to update profile:', error);
        this.notyf.error('Failed to update employee profile.');
      }
    );
  }

  updateProfileImage() {
    if (this.imageUrl) {
      this.employeeService.updateImage(this.employee.employeeId, this.imageUrl).subscribe(
        res => {
          this.employee.profileImage = res.profileImage;
          this.employeeService.setEmployee(this.employee);
          localStorage.setItem('employee', JSON.stringify(this.employee));

          Swal.fire({
            icon: 'success',
            title: 'Image Updated',
            text: 'Profile image updated successfully.',
            confirmButtonColor: '#4CAF50'
          });

          this.closeImageModal();
        },
        error => {
          console.error('Image update failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update profile image.',
            confirmButtonColor: '#F44336'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Empty Image URL',
        text: 'Please provide an image URL before updating.',
        confirmButtonColor: '#2196F3'
      });
    }
  }
}
