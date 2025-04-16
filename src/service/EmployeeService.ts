import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Employee from "../app/model/Employee";
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})

export default  class EmployeeService {

  constructor(private http:HttpClient){}

  createAccount(employee: Employee):Observable<Employee> {
    return this.http.post<Employee>("http://localhost:8080/api/employee/create", employee);
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

  update(employee:Employee){
    return this.http.put("http://localhost:8080/api/employee/update",employee);
  }




}
