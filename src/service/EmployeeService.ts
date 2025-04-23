import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Employee from "../app/model/Employee";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})

export default  class EmployeeService {

  private currentEmployeeSubject = new BehaviorSubject<Employee | null>(null);
    currentEmployee$ = this.currentEmployeeSubject.asObservable();


  constructor(private http:HttpClient){}

  createAccount(employee: Employee):Observable<Employee> {
    return this.http.post<Employee>("http://localhost:8080/api/employee/create", employee);
  }

  findByUserID(userID:number):Observable<Employee>{
    return this.http.get<Employee>("http://localhost:8080/api/employee/user/"+userID);
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



//local storage to save
 setEmployee(employee: Employee): void {
    this.currentEmployeeSubject.next(employee);
    localStorage.setItem('employeeId', JSON.stringify(employee)); // Optional: persist between refreshes
  }

  getEmployee(): Employee | null {
    const employee = this.currentEmployeeSubject.value;
    if (employee) return employee
    ;

    // Fallback to localStorage if page was refreshed
    const stored = localStorage.getItem('employeeId');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.currentEmployeeSubject.next(parsed);
      return parsed;
    }

    return null;
  }

  clearUser(): void {
    this.currentEmployeeSubject.next(null);
    localStorage.removeItem('user');
  }


}
