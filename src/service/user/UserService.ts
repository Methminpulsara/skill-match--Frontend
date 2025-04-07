import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export default class UserService{
  constructor(private http:HttpClient){}

  addCustomer(){
      return this.http.post("http://localhost:8080/api/user");
  }

}
