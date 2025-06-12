import { Component, Input, OnInit } from '@angular/core';
import Employee from '../../../model/Employee';
import EmployeeService from '../../../../service/EmployeeService';
import SkillService from '../../../../service/SkillService';
import { CareerSuggestionService } from '../../../../service/CareerSuggestion';
import { CareerCardComponent } from "../../cards/career-card/career-card.component";
import { NgFor } from '@angular/common';
import CareerSuggestion from '../../../model/CareerSuggestion';

@Component({
  selector: 'app-career-growth',
  imports: [CareerCardComponent, NgFor],
  templateUrl: './career-growth.component.html',
  styleUrl: './career-growth.component.css',
})
export class CareerGrowthComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private careerSuggestionService: CareerSuggestionService
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

  suggestionList: CareerSuggestion[] = [];

  ngOnInit(): void {
    const employee = this.employeeService.getEmployee();
    if (employee) {
      this.employee = employee;
      this.getSkills(employee.employeeId);
    }
  }
 getSkills(employeeId: number): void {
    this.careerSuggestionService.getSuggestions(employeeId).subscribe(res => {
      this.suggestionList = res;
      console.log(res);

    });
  }
}
