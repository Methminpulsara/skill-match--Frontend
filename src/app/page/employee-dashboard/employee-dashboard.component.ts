import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TheamComponent } from '../theam/theam.component';

@Component({
  selector: 'app-employee-dashboard',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

}
