import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import EmployeeService from '../../../service/EmployeeService';
import Employee from '../../model/Employee';

@Component({
  selector: 'app-employee-dashboard',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {

  constructor(private employeeService: EmployeeService){}

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
  ngOnInit(): void {

    const employee = this.employeeService.getEmployee()
    if(employee){
      this.employee = employee;
    }

 }
  changeTheme(event: any) {
    const theme = event.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}
