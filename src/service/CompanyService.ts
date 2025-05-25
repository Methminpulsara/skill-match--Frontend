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

   updateImage(companyId: number, url: string):Observable<Company> {
      const body =  url ; // Pass the URL in the request body
      const apiUrl = `http://localhost:8080/api/company/${companyId}/profile-image`; // Correct URL with backticks
      return this.http.put<Company>(apiUrl, body);
    }

    update(companyId: number, company: Company): Observable<Company> {
      return this.http.put<Company>(`http://localhost:8080/api/company/update/${companyId}`, company);
    }


  //sessionStorage to save
   setCompany(company: Company): void {
      this.currentCompanySubject.next(company);
      sessionStorage.setItem('company', JSON.stringify(company)); // Optional: persist between refreshes
    }

    getCompany(): Company | null {
      const company = this.currentCompanySubject.value;
      if (company) return company
      ;

      // Fallback to localStorage if page was refreshed
      const stored = sessionStorage.getItem('company');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.currentCompanySubject.next(parsed);
        return parsed;
      }

      return null;
    }

    clearUser(): void {
      this.currentCompanySubject.next(null);
      sessionStorage.removeItem('company');
    }


}
