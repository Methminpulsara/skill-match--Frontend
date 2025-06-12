import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Skill from '../../../model/Skill';
import EmployeeService from '../../../../service/EmployeeService';
import SkillService from '../../../../service/SkillService';
import { SkillCardComponent } from "../../cards/skill-card/skill-card.component";

@Component({
  selector: 'app-sikll',
  imports: [CommonModule, FormsModule, SkillCardComponent],
  templateUrl: './sikll.component.html',
  styleUrl: './sikll.component.css'
})
export class SikllComponent implements OnInit {

  constructor(
    private employeeService:EmployeeService,
    private skillService:SkillService
  ){}

  public skill:Skill= {
    skillId:  1,
    name:"",
    description:"",
    status:"active",
    proficiencyLevel:"",
    time:"",
    employeeId:1
  }

  skillList: Skill[] =[]

  // fillter krana arrays tika meke save wenw me array eka psse html eke wada krnw
  filteredSkills: Skill[] = [];
  time = new Date().toLocaleString();
  selectLevel:string ="";
  search:string=""

  ngOnInit(): void {
    const employee = this.employeeService.getEmployee();
    this.skill.time = this.time;
    if (employee) {
      this.skill.employeeId = employee.employeeId;
      this.getEmployeeSkills(employee.employeeId);
    }

  }

  isModalOpen = false;



  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  skillRequest(){
    this.skillService.addSkill(this.skill).subscribe(res=>{
      this.getEmployeeSkills(this.skill.employeeId);
      this.closeModal()
    });
    this.closeModal()

  }

  getEmployeeSkills(employeeId:number){
    this.skillService.getEmployeeSkills(employeeId).subscribe(res=>{
      this.skillList=res;
      this.filterSkills()
    });
  }

  onLevelChange(){
    this.filterSkills();
  }

  onSearchChanege(){
    this.filterSkills();
  }

  filterSkills() {
    this.filteredSkills = this.skillList.filter(skill =>
      skill.name.toLowerCase().includes(this.search.toLowerCase()) &&
      (this.selectLevel === '' || skill.proficiencyLevel === this.selectLevel)
    );
  }



}
