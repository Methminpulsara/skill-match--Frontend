import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sikll',
  imports: [CommonModule,FormsModule],
  templateUrl: './sikll.component.html',
  styleUrl: './sikll.component.css'
})
export class SikllComponent {
  isModalOpen = false;

  skill = {
    name: '',
    proficiencyLevel: ''
  };

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.skill = {
      name: '',
      proficiencyLevel: ''
    };
  }

  submitSkill() {
    console.log('Skill Submitted:', this.skill);
    this.closeModal();
  }
}
