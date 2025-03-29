import { Component, OnInit } from '@angular/core';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { RouterOutlet } from '@angular/router';
import { EmployeeProfileComponent } from './page/employee/employee-profile/employee-profile.component';
import { TheamComponent } from './page/theam/theam.component';
import { TrainingsComponent } from './page/company/trainings/trainings.component';
import { CompanyEmployeesComponent } from './page/company/company-employees/company-employees.component';
import { DepartmentsComponent } from './page/company/departments/departments.component';
import { InternaliJobBoardComponent } from './page/company/internali-job-board/internali-job-board.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentTheme: string = 'light';

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
  }

  toggleTheme(event: any) {
    this.currentTheme = event.target.checked ? 'dark' : 'light';
    this.setTheme(this.currentTheme);
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
