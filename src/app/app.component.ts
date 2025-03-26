import { Component } from '@angular/core';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { RouterOutlet } from '@angular/router';
import { EmployeeProfileComponent } from './page/employee/employee-profile/employee-profile.component';
import { TheamComponent } from './page/theam/theam.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'web-app';

}
