import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Company from "../app/model/Company";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class CompanyService {
  register(company: Company) {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient){}

  create(company:Company){
    return this.http.post("http://localhost:8080/api/company/create",company);
  }

  update(company:Company){
    return this.http.put("http://localhost:8080/api/company/update",company);
  }

  findByName(name:string){
    return this.http.get("http://localhost:8080/api/company/name/"+name);
  }

  findByID(companyID:number){
    return this.http.get("http://localhost:8080/api/company/"+companyID);
  }

  getAll():Observable<Company[]>{
    return this.http.get<Company[]>("http://localhost:8080/api/company/active");
  }



}
