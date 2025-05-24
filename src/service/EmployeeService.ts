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

    update(employeeId: number, employee: Employee): Observable<Employee> {
      return this.http.put<Employee>(`http://localhost:8080/api/employee/update/${employeeId}`, employee);
    }


  updateImage(employeeId: number, url: string):Observable<Employee> {
    const body =  url ; // Pass the URL in the request body
    const apiUrl = `http://localhost:8080/api/employee/${employeeId}/profile-image`; // Correct URL with backticks
    return this.http.put<Employee>(apiUrl, body);
  }


  getAllWithCompanyId(comapanyId:number):Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:8080/api/employee/all/"+comapanyId)
  }




//local storage to save
// Save employee object to localStorage and the current state
 // Save the employee to the service and sessionStorage
  setEmployee(employee: Employee): void {
    this.currentEmployeeSubject.next(employee);
    sessionStorage.setItem('employee', JSON.stringify(employee)); // Use sessionStorage
  }

  // Get employee from the service or sessionStorage
  getEmployee(): Employee | null {
    const employee = this.currentEmployeeSubject.value;
    if (employee) return employee;

    const stored = sessionStorage.getItem('employee');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.currentEmployeeSubject.next(parsed);
      return parsed;
    }

    return null;
  }

  // Clear employee data
  clearEmployee(): void {
    this.currentEmployeeSubject.next(null);
    sessionStorage.removeItem('employee');
  }


}
