import { Component, OnInit } from '@angular/core';
import TrainingProgram from '../../../model/TrainingProgram';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import TrainingService from '../../../../service/TrainingProgramsService';
import { CompanyService } from '../../../../service/CompanyService';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Swal from 'sweetalert2';
import EnrollmentsService from '../../../../service/EnrollmentService';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent implements OnInit {
  constructor(
    private programService: TrainingService,
    private companyService: CompanyService,
    private enrollmentService:EnrollmentsService
  ) {
    this.notyf = new Notyf({
      types: [
        {
          type: 'success',
          background: '#4CAF50',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'check_circle' }
        },
        {
          type: 'error',
          background: '#F44336',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'error' }
        },
        {
          type: 'info',
          background: '#2196F3',
          duration: 3000,
          icon: { className: 'material-icons', tagName: 'i', text: 'info' }
        }
      ]
    });
  }

  search:string='';
  isTrainingModalOpen = false;
  badgeInput: string = '';
  selectedTrainingId: number | null = null;
  private notyf: Notyf;
  public isupdate: boolean = false;
  trainingProgramsList: TrainingProgram[] = [];
  fillterList : TrainingProgram [] = [];
  enrollmentCounts: { [key: number]: number } = {};



  public trainingProgram: TrainingProgram = {
    trainingId: 1,
    companyId: 1,
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    badges: [],
  };

  public update = {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    badges: [] as string[]
  };

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

  addBadgeToUpdate() {
    const badge = this.badgeInput.trim();
    if (badge && !this.update.badges.includes(badge)) {
      this.update.badges.push(badge);
    }
    this.badgeInput = '';
  }

  removeBadge(index: number) {
    this.trainingProgram.badges.splice(index, 1);
  }

  removeUpdateBadge(index: number) {
    this.update.badges.splice(index, 1);
  }

  submitTrainingProgram() {
    this.addTrainingProgram();
    this.closeTrainingModal();
  }

  openUpdate(program: TrainingProgram) {
    this.selectedTrainingId = program.trainingId;

    this.update = {
      name: program.name,
      description: program.description,
      startDate: program.startDate,
      endDate: program.endDate,
      badges: [...program.badges]
    };

    this.isupdate = true;
  }

  closeUpdate() {
    this.isupdate = false;
    this.selectedTrainingId = null;
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
    this.programService.getTrainins(companyId, 'active').subscribe({
      next: (res) => {
        this.trainingProgramsList = res;
        this.fillterTrainings();

        // Fetch enrollment counts
        this.trainingProgramsList.forEach(training => {
          this.enrollmentService.getEnrollmentCount(training.trainingId).subscribe({
            next: (count) => {
              this.enrollmentCounts[training.trainingId] = count;
            },
            error: (err) => {
              console.error(`Failed to get count for trainingId ${training.trainingId}`, err);
              this.enrollmentCounts[training.trainingId] = 0;
            }
          });
        });
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
          next: () => {
            this.notyf.success('Training deleted successfully.');
            const company = this.companyService.getCompany();
            if (company) {
              this.getActiveTrainings(company.companyId);
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

  updateTraining() {
    if (!this.selectedTrainingId) return;

    const updatedProgram: TrainingProgram = {
      trainingId: this.selectedTrainingId,
      companyId: this.trainingProgram.companyId,
      name: this.update.name.trim(),
      description: this.update.description.trim(),
      startDate: this.update.startDate,
      endDate: this.update.endDate,
      status: 'active',
      badges: [...this.update.badges]
    };

    this.programService.updateTraining(this.selectedTrainingId, updatedProgram).subscribe({
      next: (res) => {
        this.notyf.success('Training updated successfully.');
        this.isupdate = false;
        this.selectedTrainingId = null;
        this.getActiveTrainings(this.trainingProgram.companyId);
      },
      error: (err) => {
        console.error(err);
        this.notyf.error('Failed to update training.');
      }
    });
  }

  //search fillter

  onSearchChange(){
    this.fillterTrainings()
  }


  fillterTrainings() {
    this.fillterList = this.trainingProgramsList.filter(program =>
      program.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }


}
