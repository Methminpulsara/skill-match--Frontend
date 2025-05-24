import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import User from "../app/model/User";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn:'root'})
export default class UserService{
  constructor(private http:HttpClient){}
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  register(user:User):Observable<User>{
      return this.http.post<User>("http://localhost:8080/api/user/register",user);
  }

  loginRequest(user:User):Observable<User>{
    return this.http.post<User>("http://localhost:8080/api/user/loginrequest",user);
  }

  //explain kr gnn meeka chategen gththe
setUser(user: User): void {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('user', JSON.stringify(user)); // Persist for session only
  }

  getUser(): User | null {
    const user = this.currentUserSubject.value;
    if (user) return user;

    // Fallback to sessionStorage if page was refreshed
    const stored = sessionStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.currentUserSubject.next(parsed);
      return parsed;
    }

    return null;
  }

  clearUser(): void {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('user');
  }

}
