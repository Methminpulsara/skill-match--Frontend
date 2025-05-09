import { Component, OnInit } from '@angular/core';
import EmployeeService from '../../../../service/EmployeeService';
import Employee from '../../../model/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../../service/CompanyService';

@Component({
  selector: 'app-company-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-employees.component.html',
  styleUrls: ['./company-employees.component.css']
})
export class CompanyEmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService,private companyService:CompanyService) {}

  employeeList: Employee[] = [];
  filteredEmployeeList: Employee[] = [];

  searchText: string = '';
  selectedPosition: string = '';
  positionList: string[] = []; 

  ngOnInit(): void {
    const company = this.companyService.getCompany()
    if(company){
      this.loadEmployees(company.companyId);
    }
  }

  loadEmployees(companyId:number) {
    this.employeeService.getAllWithCompanyId(companyId).subscribe(res => {
      console.log(res);
      this.employeeList = res;
      this.filteredEmployeeList = [...this.employeeList];
      this.extractPositions();
    });
  }

  extractPositions() {
    const positions = new Set<string>();
    this.employeeList.forEach(emp => {
      if (emp.position) {
        positions.add(emp.position);
      }
    });
    this.positionList = Array.from(positions);
  }

  onSearchChange() {
    this.filterEmployees();
  }

  onPositionChange() {
    this.filterEmployees();
  }

  filterEmployees() {
    this.filteredEmployeeList = this.employeeList.filter(emp =>
      emp.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedPosition === '' || emp.position === this.selectedPosition)
    );
  }
}
