export default class Enrollments{
  enrollmentId:number;
  trainingId:number;
  employeeId:number;


  constructor(

    enrollmentId:number,
    trainingId:number,
    employeeId:number

  ){

    this.employeeId=employeeId
    this.enrollmentId=enrollmentId
    this.trainingId=trainingId

  }

}
