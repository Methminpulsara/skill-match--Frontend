import { Component } from '@angular/core';
import { SingInComponent } from './page/sing-in/sing-in.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'web-app';

}
