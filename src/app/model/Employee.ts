export default class Employee {


  employeeId:number;
  name:string;
  phoneNumber:string;
  location:string;
  position:string;
  profileImage:string;
  department:string;
  userId:number;
  companyId:number;


  constructor(
    employeeId:number,
    name:string,
    phoneNumber:string,
    location:string,
    position:string,
    profileImage:string,
    department:string,
    userId:number,
    companyId:number

  ){
    this.employeeId=employeeId;
    this.name=name;
    this.phoneNumber=phoneNumber;
    this.location=location;
    this.position=position;
    this.profileImage=profileImage;
    this.department=department;
    this.userId=userId;
    this.companyId=companyId;
  }



}
