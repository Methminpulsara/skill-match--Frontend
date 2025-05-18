import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import User from '../../model/User';
import { RoleType } from '../../../utils/Role';
import UserService from '../../../service/UserService';
import EmployeeService from '../../../service/EmployeeService';
import { CompanyService } from '../../../service/CompanyService';
import Employee from '../../model/Employee';

import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public user: User = {
    userId: 1,
    email: '',
    password: '',
    role: RoleType.COMPANY
  };

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

  private notyf: Notyf;

  constructor(
    private router: Router,
    private userService: UserService,
    private employeeService: EmployeeService,
    private companyService: CompanyService
  ) {
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
        }
      ]
    });
  }

  loginRequest() {
    if (!this.validateForm()) {
      return;
    }

    this.userService.loginRequest(this.user).subscribe({
      next: (res) => {
        this.userService.setUser(res);
        this.notyf.success('✅ Login successful!');

        if (res.role === RoleType.COMPANY) {
          this.getCompanyDetails(res.userId);
          this.router.navigate(['/company-dashboard']);
        } else if (res.role === RoleType.EMPLOYEE) {
          this.getEmployeeDetails(res.userId);
          this.router.navigate(['/employee-dashboard']);
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again.'
        });
      }
    });
  }

  validateForm(): boolean {
    const emailValid = this.isValidEmail(this.user.email);
    const passwordValid = this.user.password.trim().length >= 1;

    if (!emailValid) {
      this.notyf.error('❌ Please enter a valid email address.');
      return false;
    }

    if (!passwordValid) {
      this.notyf.error('❌ Password must be at least 6 characters.');
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  getEmployeeDetails(userId: number) {
    this.employeeService.findByUserID(userId).subscribe(res => {
      this.employeeService.setEmployee(res);
    });
  }

  getCompanyDetails(userId: number) {
    this.companyService.findByUserID(userId).subscribe(res => {
      this.companyService.setCompany(res);
    });
  }
}
