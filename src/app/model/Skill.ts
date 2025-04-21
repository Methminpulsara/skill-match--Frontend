export default class Skill {


  skillId: number;
  name:string;
  proficiencyLevel:string;
  employeeId:number;

  constructor(
    skillId:number,
    name:string,
    proficiencyLevel:string,
    employeeId:number
  ){

    this.skillId=skillId;
    this.name=name
    this.proficiencyLevel=proficiencyLevel;
    this.employeeId=employeeId;

  }
}


