import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import EmployeeService from '../../../../service/EmployeeService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Employee from '../../../model/Employee';
import User from '../../../model/User';
import { RoleType } from '../../../../utils/Role';
import UserService from '../../../../service/UserService';
import { CompanyService } from '../../../../service/CompanyService';
import Company from '../../../model/Company';

@Component({
  selector: 'app-employee-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent {

  nextPageNumber: number = 1;
  comfirmPassword: string = '';
  savedUserID: number = 0;
  selectedCompanyName: string = "";

  public employee: Employee = {
    employeeID: 1,
    name: '',
    phoneNumber: '',
    location: '',
    position: '',
    profileImage: '',
    department: '',
    userId: 0,
    companyId: 0
  }
  public user: User = {
    userId: 1,
    email: '',
    password: '',
    role: RoleType.EMPLOYEE
  }
  companyList: Company[] = []

  constructor(
    private companyServie: CompanyService,
    private userService: UserService,
    private employeeService: EmployeeService) {
    this.getCompany();
  }

  nextPageOnAction(page: number) {
    this.nextPageNumber = page;
  }

  registerEmployee() {

    if (this.comfirmPassword === this.user.password) {

      this.userService.register(this.user).subscribe(res => {
        console.log("FULL RESPONSE:", res);

        const id = res?.userId as number;
        if (id) {
          this.savedUserID = id;
          this.employee.userId = id;
          this.employeeRegister();
        } else {
          console.error("User ID not received from backend.");
        }
      });
    }
  }
  employeeRegister() {
    this.employeeService.createAccount(this.employee).subscribe(res => {
      alert("Employee is Registerd !");
    })
  }
  getCompany() {
    this.companyServie.getAll().subscribe(res => {
      this.companyList = res;
    })
  }
  onCompanySelect() {
    const selectedCompany = this.companyList.find(c => c.name === this.selectedCompanyName);
    if (selectedCompany) {
      this.employee.companyId = selectedCompany.companyId;
    }
  }
}
