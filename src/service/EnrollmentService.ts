import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Enrollments from "../app/model/Enrollmetnts";

@Injectable ({
  providedIn : "root"
})
export default class EnrollmentsService{

  constructor(private http:HttpClient){}

  add (enrollment :Enrollments){
    return this.http.post("http://localhost:8080/api/enrollments/add",enrollment);
  }

  getByEmployeeId(employeeId: number) {
    return this.http.get("http://localhost:8080/api/enrollments/employee/"+employeeId);
  }

}
