export default class TrainingProgram {
  trainingId: number;
  name: string;
  description: string;
  companyId: number;
  startDate: string;
  endDate: string;
  enrolledEmployeeId: Set<number>;

  constructor(
    trainingId: number,
    name: string,
    description: string,
    companyId: number,
    startDate: string,
    endDate: string,
    enrolledEmployeeId: Set<number>
  ){
    this.trainingId =trainingId
    this.name=name
    this.description=description
    this.startDate=startDate
    this.companyId=companyId
    this.endDate=endDate
    this.enrolledEmployeeId=enrolledEmployeeId
  }


}

