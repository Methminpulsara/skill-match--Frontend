import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User from "../app/model/User";

@Injectable({
  providedIn:'root'
})
export default class UserService{
  constructor(private http:HttpClient){}

  register(user:User){
      return this.http.post("http://localhost:8080/api/user",user);
  }

  login(user:User){
    return this.http.post("http://localhost:8080/api/user/login",user);
  }

}
