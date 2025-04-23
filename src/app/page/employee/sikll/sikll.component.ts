import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Skill from '../../../model/Skill';

@Component({
  selector: 'app-sikll',
  imports: [CommonModule,FormsModule],
  templateUrl: './sikll.component.html',
  styleUrl: './sikll.component.css'
})
export class SikllComponent {
  isModalOpen = false;

 public skill:Skill= {
  skillId:  1,
  name:"",
  proficiencyLevel:"",
  employeeId:1
}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitSkill() {
    this.closeModal();
  }

  skillRequest(){
    console.log("cliked");

  }
}
