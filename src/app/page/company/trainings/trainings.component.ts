import { Component } from '@angular/core';
import TrainingProgram from '../../../model/TrainingProgram';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainings',
  imports: [CommonModule,FormsModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent {
  isTrainingModalOpen = false;

  badgeInput: string = '';

  public  trainingProgram :TrainingProgram = {
    trainingId:1,
    companyId:1,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    badges:  [] =[],
    enrolledEmployeeId: new Set<number>
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
      this.trainingProgram.badges.push(badge);
    }
    this.badgeInput = '';
  }

  removeBadge(index: number) {
    this.trainingProgram.badges.splice(index, 1);
  }

  submitTrainingProgram() {
    console.log('Submitting:', this.trainingProgram);
    // Call your service here to POST the training program
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
    badges:  [] =[],
    enrolledEmployeeId: new Set<number>
    };
    this.badgeInput = '';
  }
}
