import { Component, Input } from '@angular/core';
import CareerSuggestion from '../../../model/CareerSuggestion';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-career-card',
  imports: [NgFor ],
  templateUrl: './career-card.component.html',
  styleUrl: './career-card.component.css'
})
export class CareerCardComponent {


  @Input () suggestions!:CareerSuggestion;

}
