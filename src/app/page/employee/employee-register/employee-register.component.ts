import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import EmployeeService from '../../../../service/EmployeeService';

@Component({
  selector: 'app-employee-register',
  imports: [RouterLink],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent {



  constructor(employeeService:EmployeeService){}





}
