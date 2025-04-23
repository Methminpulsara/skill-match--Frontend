import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Skill from "../app/model/Skill";
import { Observable } from "rxjs";

@Injectable({
  providedIn:"root"
})

export default class SkillService{

  constructor(private http:HttpClient){}

   addSkill(skill: Skill):Observable<Skill> {
     return this.http.post<Skill>("http://localhost:8080/api/skill/create", skill);
   }




}
