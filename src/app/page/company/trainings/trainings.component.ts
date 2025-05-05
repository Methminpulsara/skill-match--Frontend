import { Component, OnInit } from '@angular/core';
import TrainingProgram from '../../../model/TrainingProgram';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import TrainingService from '../../../../service/TrainingProgramsService';
import { CompanyService } from '../../../../service/CompanyService';

import { Notyf } from 'notyf';               // ✅ Import Notyf
import 'notyf/notyf.min.css';               // ✅ Import Notyf styles
import Swal from 'sweetalert2';             // ✅ Import SweetAlert2

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent implements OnInit {
  isTrainingModalOpen = false;
  badgeInput: string = '';

  trainingProgramsList: TrainingProgram[] = [];

  public trainingProgram: TrainingProgram = {
    trainingId: 1,
    companyId: 1,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'active',
    badges: [],
  };

  private notyf: Notyf; // ✅ Notyf instance

  constructor(
    private programService: TrainingService,
    private companyService: CompanyService
  ) {
    this.notyf = new Notyf(); // ✅ Initialize Notyf
  }

  ngOnInit(): void {
    const company = this.companyService.getCompany();
    if (company) {
      this.trainingProgram.companyId = company.companyId;
      this.getActiveTrainings(company.companyId);
    }
  }

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
    this.addTrainingProgram();
    this.closeTrainingModal();
  }

  resetForm() {
    this.trainingProgram = {
      trainingId: 1,
      companyId: 1,
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      status: '',
      badges: [],
    };
    this.badgeInput = '';
  }

  addTrainingProgram() {
    this.programService.addTraingProgarm(this.trainingProgram).subscribe({
      next: (res) => {
        this.notyf.success('Training program added successfully.');
        this.getActiveTrainings(this.trainingProgram.companyId);
      },
      error: (err) => {
        console.error(err);
        this.notyf.error('Failed to add training program.');
      }
    });
  }

  getActiveTrainings(companyId: number) {
    this.programService.getEmployeeSkills(companyId, 'active').subscribe({
      next: (res) => {
        console.log(res);
        this.trainingProgramsList = res;
      },
      error: (err) => {
        console.error(err);
        this.notyf.error('Failed to fetch active training programs.');
      }
    });
  }

  deleteTraining(trainingId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the training program.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.programService.removeTrainings(trainingId).subscribe({
          next: (res) => {
            console.log(res);
            this.notyf.success('Training deleted successfully.');
            const company = this.companyService.getCompany();
            if (company) {
              this.getActiveTrainings(company.companyId); // Refresh list
            }
          },
          error: (err) => {
            console.error(err);
            this.notyf.error('Failed to delete training.');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notyf.open({ type: 'info', message: 'Deletion cancelled.' });
      }
    });
  }
}
