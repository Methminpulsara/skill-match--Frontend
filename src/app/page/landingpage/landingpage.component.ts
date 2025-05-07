import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {

 public isEmployeeModalOpen = false;
  openEmployeeModal() {
    this.isEmployeeModalOpen = true;
  }

  closeEmployeeModal() {
    this.isEmployeeModalOpen = false;
  }


}
