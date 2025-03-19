import { Component } from '@angular/core';
import { SingInComponent } from './page/sing-in/sing-in.component';

@Component({
  selector: 'app-root',
  imports: [SingInComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  title = 'web-app';

}
