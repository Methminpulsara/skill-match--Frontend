import Employee from "./Employee";

export default class Trainingprograms{

  trainingID:number;
  name:string;
  description:string;
  companyID:number;
  enrolledEmployeeId:Employee[];

  constructor(
    trainingID:number,
    name:string,
    description:string,
    companyID:number,
    enrolledEmployeeId:Employee[]
  ){
    this.trainingID = trainingID;
    this.name= name;
    this.description = description;
    this.companyID= companyID;
    this.enrolledEmployeeId = enrolledEmployeeId;
  }


}