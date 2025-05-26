import { Component, OnInit } from '@angular/core';
import Employee from '../../../model/Employee';
import EmployeeService from '../../../../service/EmployeeService';
import SkillService from '../../../../service/SkillService';

@Component({
  selector: 'app-career-growth',
  imports: [],
  templateUrl: './career-growth.component.html',
  styleUrl: './career-growth.component.css',
})
export class CareerGrowthComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private skillService:SkillService
  ) {}

  public employee: Employee = {
    employeeId: 1,
    name: '',
    phoneNumber: '',
    location: '',
    position: '',
    profileImage: '',
    department: '',
    userId: 0,
    companyId: 0,
  };

  ngOnInit(): void {
      const employee= this.employeeService.getEmployee()
      if(employee){
        this.employee=employee
        this.getSkills(employee.employeeId)
      }
  }

  getSkills(employeeId:number){
    this.skillService.getEmployeeSkills(employeeId).subscribe(res=>{
      console.log(res);
    })
  }


}
