import { Component, OnInit } from '@angular/core';
import TrainingProgram from '../../../model/TrainingProgram';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import TrainingService from '../../../../service/TrainingProgramsService';
import { CompanyService } from '../../../../service/CompanyService';

@Component({
  selector: 'app-trainings',
  imports: [CommonModule,FormsModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent implements OnInit {



  isTrainingModalOpen = false;
  badgeInput: string = '';

  constructor(
    private programService:TrainingService,
    private companyService:CompanyService
  ){}
  ngOnInit(): void {
    const company = this.companyService.getCompany()
    if(company){
      this.trainingProgram.companyId = company.companyId
      this.getActiveTrainings(company.companyId)
    }
  }

  public  trainingProgram :TrainingProgram = {
    trainingId:1,
    companyId:1,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status:"active",
    badges:  [] =[],
    enrolledEmployeeId: [] =[]
  };

  openTrainingModal() {
    this.isTrainingModalOpen = true;
  }

  closeTrainingModal() {
    this.isTrainingModalOpen = false;
    this.resetForm();
  }

  addBadge() {
    const badge = this.badgeInput.trim();
    if (badge && !this.trainingProgram.badges.includes(badge)) {
      this.trainingProgram.badges.push(badge);  // Add badge as a string
    }
    this.badgeInput = '';  // Clear input field after adding badge
  }


  removeBadge(index: number) {
    this.trainingProgram.badges.splice(index, 1);
  }

  submitTrainingProgram() {

    this.addTrainingProgram();
    this.closeTrainingModal();
  }

  resetForm() {
    this.trainingProgram = {
    trainingId:1,
    companyId:1,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status :'',
    badges:  [] =[],
    enrolledEmployeeId: []=[]
  }
    this.badgeInput = '';
  }

  trainingProgramsList :TrainingProgram []=[]

addTrainingProgram(){
  this.programService.addTraingProgarm(this.trainingProgram).subscribe(res=>{})
}


getActiveTrainings(companyId:number){
  this.programService.getEmployeeSkills(companyId,"active").subscribe(res=>{
      console.log(res);
      this.trainingProgramsList=res;
  })
}
}
