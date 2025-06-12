import { Component, Input } from '@angular/core';
import Skill from '../../../model/Skill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-card',
  imports: [CommonModule],
  templateUrl: './skill-card.component.html',
  styleUrl: './skill-card.component.css',
})
export class SkillCardComponent {
  @Input() skill !: Skill;
}
