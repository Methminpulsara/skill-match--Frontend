import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentTheme: string = 'light';

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    const themeToggle = document.querySelector('.theme-controller') as HTMLInputElement;
    if (themeToggle) {
      themeToggle.checked = savedTheme === 'dark';
    }
  }

  toggleTheme(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.currentTheme = isChecked ? 'dark' : 'light';
    this.setTheme(this.currentTheme);
  }

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
function initFlowbite() {
  throw new Error('Function not implemented.');
}

