export default class User{

  userID:number;
  email:string;
  password:string;
  role:string;

  constructor(userID:number,email:string,password:string,role:string){
    this.userID=userID;
    this.email=email;
    this.password=password;
    this.role=role;
  }


}
