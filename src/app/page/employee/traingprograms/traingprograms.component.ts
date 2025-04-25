import { Component, OnInit } from '@angular/core';
import TrainingProgramsService from '../../../../service/TrainingProgramsService';
import TrainingProgram from '../../../model/TrainingProgram';
import EmployeeService from '../../../../service/EmployeeService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-traingprograms',
  imports: [CommonModule,FormsModule],
  templateUrl: './traingprograms.component.html',
  styleUrl: './traingprograms.component.css'
})
export class TraingprogramsComponent implements OnInit {


  constructor(
    private TrainigProgramsService:TrainingProgramsService,
    private employeeService:EmployeeService
  ) { }
  ngOnInit(): void {


    const employee = this.employeeService.getEmployee();
    if(employee){
      console.log(employee);
      this.getTrainings(employee.companyId,"active");
      
    }


   console.log(this.programsList);
   
  }



  programsList :TrainingProgram []=[]

  getTrainings(companyId:number,status:string) {
    this.TrainigProgramsService.getEmployeeSkills(companyId,status).subscribe(res=>{this.programsList=res})
  } 



}
