import { RoleType } from "../../utils/Role";

export default class User {

  userId:number;
  email:string;
  password:string;
  role:RoleType;

  constructor(userId:number,email:string,password:string,role:RoleType){
    this.userId=userId;
    this.email=email;
    this.password=password;
    this.role=role;
  }


}
