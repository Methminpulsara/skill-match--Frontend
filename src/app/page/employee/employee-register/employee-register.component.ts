import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import EmployeeService from '../../../../service/EmployeeService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Employee from '../../../model/Employee';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import Company from '../../../model/Company';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-employee-register',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent {

  nextPageNumber: number = 1;
  comfirmPassword: string = '';
  savedUserID: number = 0;
  selectedCompanyName: string = "";
  formSubmitted: boolean = false;
  private notyf: Notyf;

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

  public user: User = {
    userId: 1,
    email: '',
    password: '',
    role: RoleType.EMPLOYEE
  };

  companyList: Company[] = [];

  constructor(
    private companyServie: CompanyService,
    private userService: UserService,
    private routes: Router,
    private employeeService: EmployeeService
  ) {
    this.getCompany();

    this.notyf = new Notyf({
      types: [
        {
          type: 'success',
          background: '#4CAF50',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'check_circle' }
        },
        {
          type: 'error',
          background: '#F44336',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'error' }
        },
        {
          type: 'info',
          background: '#2196F3',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'info' }
        }
      ]
    });
  }

 nextPageOnAction(page: number) {
  this.formSubmitted = true;

  // Page 1: Validate name, position, location, and company name
  if (this.nextPageNumber === 1) {
    const valid =
      this.employee.name &&
      this.employee.position &&
      this.employee.location &&
      this.selectedCompanyName;

    if (!valid) {
      this.notyf.error('Please fill all details.');
      return;
    }
  }

  // Page 2: Validate email and password
  if (this.nextPageNumber === 2) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid =
      this.user.email &&
      emailRegex.test(this.user.email) &&
      this.user.password &&
      this.comfirmPassword &&
      this.user.password === this.comfirmPassword;

    if (!valid) {
      this.notyf.error('Please enter a valid email and matching passwords.');
      return;
    }
  }

  this.nextPageNumber = page;
  this.formSubmitted = false;
}


 registerEmployee() {
  this.formSubmitted = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!this.user.email || !emailRegex.test(this.user.email)) {
    this.notyf.error('Invalid or missing email.');
    return;
  }

  if (!this.user.password || !this.comfirmPassword || this.user.password !== this.comfirmPassword) {
    this.notyf.error('Password mismatch or empty.');
    return;
  }

  if (
    !this.employee.name ||
    !this.employee.position ||
    !this.employee.location ||
    !this.selectedCompanyName
  ) {
    this.notyf.error('Please fill all input fields.');
    return;
  }

  this.userService.register(this.user).subscribe({
    next: (res) => {
      const id = res?.userId as number;
      if (id) {
        this.savedUserID = id;
        this.employee.userId = id;
        this.employeeRegister();
      } else {
        console.error("User ID not received from backend.");
      }
    },
    error: (err) => {
      console.error('Registration failed:', err);
      if (err.status === 409 || err.status === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Duplicate Email',
          text: 'Email is already registered.'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Unexpected Error',
          text: 'An unexpected error occurred. Please try again.'
        });
      }
    }
  });
}


  employeeRegister() {
    const selectedCompany = this.companyList.find(c => c.name === this.selectedCompanyName);
    if (selectedCompany) {
      this.employee.companyId = selectedCompany.companyId;
    }

    this.employeeService.createAccount(this.employee).subscribe(() => {
      this.notyf.success('Employee registered successfully!');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee has been registered successfully!'
      }).then(() => {
        this.routes.navigate(['/login']);
      });
    });
  }

  getCompany() {
    this.companyServie.getAll().subscribe(res => {
      this.companyList = res;
    });
  }

  onCompanySelect() {
    const selectedCompany = this.companyList.find(c => c.name === this.selectedCompanyName);
    if (selectedCompany) {
      this.employee.companyId = selectedCompany.companyId;
    }
  }
}
