export default class Skill{

  skillID:number;
  name:string;
  proficiencyLevel:string;
  employeeId:number;

  constructor(skillId:number,name:string,proficiencyLevel:string,  employeeId:number){
    this.skillID=skillId;
    this.name=name;
    this.proficiencyLevel=proficiencyLevel;
    this.employeeId=employeeId;
  }
}
