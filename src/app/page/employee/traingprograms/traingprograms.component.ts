import { Component, OnInit } from '@angular/core';
import TrainingProgramsService from '../../../../service/TrainingProgramsService';
import TrainingProgram from '../../../model/TrainingProgram';
import EmployeeService from '../../../../service/EmployeeService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Enrollments from '../../../model/Enrollmetnts';
import EnrollmentsService from '../../../../service/EnrollmentService';

@Component({
  selector: 'app-traingprograms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './traingprograms.component.html',
  styleUrls: ['./traingprograms.component.css']
})
export class TraingprogramsComponent implements OnInit {

  constructor(
    private trainingProgramsService: TrainingProgramsService,
    private employeeService: EmployeeService,
    private enrollmentsService: EnrollmentsService
  ) {}

  programsList: (TrainingProgram & { alreadyEnrolled?: boolean })[] = [];
  enrollment: Enrollments = {
    employeeId: 1,
    trainingId: 1,
    enrollmentId: 1
  };

  employeeId: number = 1;
  enrolledTrainingIds: number[] = [];

  ngOnInit(): void {
    const employee = this.employeeService.getEmployee();
    if (employee) {
      console.log(employee);
      this.employeeId = employee.employeeId;
      this.getTrainings(employee.companyId, "active");
    }
  }

  getTrainings(companyId: number, status: string) {
    this.trainingProgramsService.getEmployeeSkills(companyId, status).subscribe(res => {
      this.programsList = res;
      this.loadEnrollments();
    });
  }

  loadEnrollments() {
    
    this.enrollmentsService.getByEmployeeId(this.employeeId).subscribe(res => {
      console.log('Response from enrolledEMID:', res);  
  
      this.enrolledTrainingIds = (Array.isArray(res) ? res : []).map((enrollment: any) => enrollment.trainingId);
  
      this.programsList.forEach(program => {
        program.alreadyEnrolled = this.enrolledTrainingIds.includes(program.trainingId);
      });
    });
  }
  
  enroll(trainingId: number) {
    this.enrollment.trainingId = trainingId;
    this.enrollment.employeeId = this.employeeId;

    this.enrollmentsService.add(this.enrollment).subscribe({
      next: (res) => {
        console.log('Enrolled successfully:', res);
        alert('Successfully enrolled!');
        this.loadEnrollments(); 
      },
      error: (err) => {
        if (err.status === 400 && err.error === "Already enrolled in this training.") {
          alert("You have already enrolled in this training!");
        } else {
          console.error('Enrollment failed:', err);
        }
      }
    });
  }
}
