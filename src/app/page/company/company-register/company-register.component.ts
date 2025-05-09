import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import Company from '../../../model/Company';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-register',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf, RouterModule],
  templateUrl: './company-register.component.html',
  styleUrl: './company-register.component.css'
})
export class CompanyRegisterComponent {
  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  nextpagenumber: number = 1;
  savedUserID: number = 0;
  comfirmPassword: string = '';
  formSubmitted: boolean = false;

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

  nextButtonOnAction(page: number) {
    this.formSubmitted = true;

    if (this.company.name && this.company.industry && this.company.size) {
      this.nextpagenumber = page;
      this.formSubmitted = false;
    } else {
      alert('Please fill all required fields before proceeding.');
    }
  }

  register() {
    this.formSubmitted = true;

    const isUserValid = this.user.email && this.user.password && this.comfirmPassword;
    const isCompanyValid = this.company.name && this.company.industry && this.company.size;

    if (!isUserValid || !isCompanyValid || this.comfirmPassword !== this.user.password) {
      if (this.comfirmPassword !== this.user.password) {
        alert('Passwords do not match');
      } else {
        alert('Please fill all the required fields.');
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
          alert('Email is already registered.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    });
  }

  registerCompany() {
    this.companyService.create(this.company).subscribe(() => {
      alert('Company was registered successfully!');
      this.router.navigate(['/login']);
    });
  }
}
