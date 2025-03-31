export default class Employee {
   id: number;
   name: string;
   phonenumber: string;
   position: string;
   department: string;
   userId: number;
   companyID:number;

   constructor(
      id: number,
      name: string,
      phonenumber: string,
      position: string,
      department: string,
      userId: number,
      companyID:number
   ){
    this.id = id;
    this.name = name;
    this.phonenumber = phonenumber;
    this.position = position;
    this.department = department;
    this.userId = userId;
    this.companyID = companyID
   }
}