import { RoleType } from "../../utils/Role";

export default class User {

  userID:number;
  email:string;
  password:string;
  role:RoleType;

  constructor(userId:number,email:string,password:string,role:RoleType){
    this.userID=userId;
    this.email=email;
    this.password=password;
    this.role=role;
  }


}
