import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Company from "../app/model/Company";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class CompanyService {
  register(company: Company) {
    throw new Error('Method not implemented.');
  }
  constructor(private http:HttpClient){}

    private currentCompanySubject = new BehaviorSubject<Company | null>(null);
      currentCompany$ = this.currentCompanySubject.asObservable();
  

  create(company:Company){
    return this.http.post("http://localhost:8080/api/company/create",company);
  }

  update(company:Company){
    return this.http.put("http://localhost:8080/api/company/update",company);
  }

  findByName(name:string){
    return this.http.get("http://localhost:8080/api/company/name/"+name);
  }

  findByID(companyID:number):Observable<Company>{
    return this.http.get<Company>("http://localhost:8080/api/company/search/"+companyID);
  }

  getAll():Observable<Company[]>{
    return this.http.get<Company[]>("http://localhost:8080/api/company/active");
  }

  findByUserID(userID:number):Observable<Company>{
    return this.http.get<Company>("http://localhost:8080/api/company/user/"+userID);
  }






  
  //local storage to save
   setCompany(company: Company): void {
      this.currentCompanySubject.next(company);
      localStorage.setItem('company', JSON.stringify(company)); // Optional: persist between refreshes
    }
  
    getCompany(): Company | null {
      const company = this.currentCompanySubject.value;
      if (company) return company
      ;
  
      // Fallback to localStorage if page was refreshed
      const stored = localStorage.getItem('company');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.currentCompanySubject.next(parsed);
        return parsed;
      }
  
      return null;
    }
  
    clearUser(): void {
      this.currentCompanySubject.next(null);
      localStorage.removeItem('company');
    }
  

}
