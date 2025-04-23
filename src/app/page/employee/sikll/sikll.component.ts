import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Skill from '../../../model/Skill';
import EmployeeService from '../../../../service/EmployeeService';
import SkillService from '../../../../service/SkillService';

@Component({
  selector: 'app-sikll',
  imports: [CommonModule,FormsModule],
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
   
 time = new Date().toLocaleString(); // Date and time, nicely formatted


  ngOnInit(): void {

    
    const employee=this.employeeService.getEmployee();
    this.skill.time = this.time;
    if(employee){
      this.skill.employeeId=employee.employeeId;
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

  skillList: Skill[] =[]



  skillRequest(){
    this.skillService.addSkill(this.skill).subscribe(res=>{});
    this.closeModal()
  }

  getEmployeeSkills(employeeId:number){
    this.skillService.getEmployeeSkills(employeeId).subscribe(res=>{
      this.skillList=res;
    });
  }

}
