import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export default  class Employee {

  constructor(private http:HttpClient){}

  createAccount(employee: Employee) {
    return this.http.post("http://localhost:8080/api/employee/create", employee);
  }

  findByUserID(userID:number){
    return this.http.get("http://localhost:8080/api/employee/user"+userID);
  }

  findBYName(name:string){
    return this.http.get("http://localhost:8080/api/employee/name/"+name);
  }

  findBYID(employeeID:number){
      return this.http.get("http://localhost:8080/api/employee/"+employeeID);
  }




}
