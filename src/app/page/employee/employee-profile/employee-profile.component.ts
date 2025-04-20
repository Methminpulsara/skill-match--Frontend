import { Component, OnInit } from '@angular/core';
import UserService from '../../../../service/UserService';
import EmployeeService from '../../../../service/EmployeeService';
import Employee from '../../../model/Employee';

@Component({
  selector: 'app-employee-profile',
  imports: [],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.css'
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
  }
   employeeEmail = '';

  constructor(
    private userSerivce:UserService,
    private employeeService:EmployeeService
  ){}

  ngOnInit(): void {

    const  user = this.userSerivce.getUser();
    if(user){
      this.employeeEmail = user.email
      this.getEmployeeDetails(user.userId);
    }else{
      console.log("user not found");
    }

  }



  getEmployeeDetails(userId:number){

    this.employeeService.findByUserID(userId).subscribe(res => {
      this.employee=res;
      console.log(this.employee)
    });


  }


}
