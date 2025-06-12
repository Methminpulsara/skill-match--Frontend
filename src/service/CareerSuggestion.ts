import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import CareerSuggestion from "../app/model/CareerSuggestion";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class CareerSuggestionService {

  constructor(private http:HttpClient){}
getSuggestions(employeeId: number): Observable<CareerSuggestion[]> {
  return this.http.get<CareerSuggestion[]>(
    `http://localhost:8080/career-suggestion/${employeeId}`
  );
}


}
