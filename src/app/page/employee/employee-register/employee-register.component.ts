import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import EmployeeService from '../../../../service/EmployeeService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-register',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css'
})
export class EmployeeRegisterComponent {

  nextPageNumber:number=1;



  constructor(employeeService:EmployeeService){}


  nextPageOnAction(page:number){
    this.nextPageNumber=page;
  }

}
