export default class Skill {


  skillId: number;
  name:string;
  proficiencyLevel:string;
  description:string;
  status:string;
  time:string;
  employeeId:number;

  constructor(
    skillId:number,
    name:string,
    proficiencyLevel:string,
    description:string,
    status:string,
    time:string,
    employeeId:number
  ){

    this.skillId=skillId;
    this.name=name
    this.proficiencyLevel=proficiencyLevel;
    this.description=description;
    this.status=status;
    this.time=time;
    this.employeeId=employeeId;

  }
}


