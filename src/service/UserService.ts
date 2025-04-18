import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User from "../app/model/User";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export default class UserService{
  constructor(private http:HttpClient){}

  register(user:User):Observable<User>{
      return this.http.post<User>("http://localhost:8080/api/user/register",user);
  }

  loginRequest(user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8080/api/user/loginrequest",user);
  }

}
