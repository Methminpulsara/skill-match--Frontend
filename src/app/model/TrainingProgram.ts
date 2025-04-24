export default class TrainingProgram {
  trainingId: number;
  name: string;
  description: string;
  companyId: number;
  startDate: string;
  endDate: string;
  status:string;
  badges: string[]; 
  enrolledEmployeeId: number[];
  constructor(
    trainingId: number,
    name: string,
    description: string,
    companyId: number,
    startDate: string,
    endDate: string,
    status:string,
    badges: string[], 
    enrolledEmployeeId: number[]
  ){
    this.trainingId =trainingId
    this.name=name
    this.description=description
    this.startDate=startDate
    this.companyId=companyId
    this.endDate=endDate
    this.status=status
    this.badges=badges
    this.enrolledEmployeeId=enrolledEmployeeId
  }


}

