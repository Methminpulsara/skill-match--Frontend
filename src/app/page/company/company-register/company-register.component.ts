import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import Company from '../../../model/Company';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-company-register',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, RouterModule],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {
  nextpagenumber: number = 1;
  savedUserID: number = 0;
  comfirmPassword: string = '';
  formSubmitted: boolean = false;
  private notyf: Notyf;

  public user: User = {
    userId: 1,
    email: '',
    password: '',
    role: RoleType.COMPANY
  };

  public company: Company = {
    companyId: 0,
    name: '',
    industry: '',
    size: '',
    status: 'active',
    profileImage: '',
    userId: 0,
    location: '',
    about: '',
    contact: ''
  };

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
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

  nextButtonOnAction(page: number) {
    this.formSubmitted = true;

    if (this.company.name && this.company.industry && this.company.size) {
      this.nextpagenumber = page;
      this.formSubmitted = false;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Info',
        text: 'Please fill all required fields before proceeding.'
      });
    }
  }

 register() {
  this.formSubmitted = true;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(this.user.email);
  const isUserValid = this.user.email && this.user.password && this.comfirmPassword;
  const isCompanyValid = this.company.name && this.company.industry && this.company.size;

  if (!isUserValid || !isCompanyValid || this.comfirmPassword !== this.user.password || !isEmailValid) {
    if (!isEmailValid) {
      this.notyf.error('Invalid email format');
    } else if (this.comfirmPassword !== this.user.password) {
      this.notyf.error('Passwords do not match');
    } else {
      this.notyf.error('Please fill all the required fields.');
    }
    return;
  }

  this.userService.register(this.user).subscribe({
    next: (res) => {
      this.savedUserID = res.userId;
      this.company.userId = this.savedUserID;
      this.registerCompany();
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
  registerCompany() {
    this.companyService.create(this.company).subscribe(() => {
      this.notyf.success('Company was registered successfully!');
      this.router.navigate(['/login']);
    });
  }
}
