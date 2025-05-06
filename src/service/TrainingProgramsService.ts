import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import TrainingProgram from "../app/model/TrainingProgram";
import { Observable } from "rxjs";



@Injectable({
  providedIn:"root"
})
export default class TrainingProgramsService{

constructor(private http:HttpClient){}

   addTraingProgarm(training: TrainingProgram):Observable<TrainingProgram> {
     return this.http.post<TrainingProgram>("http://localhost:8080/api/trainingPrograms/create", training);
   }

   getTrainins(companyId:number,status:string):Observable<TrainingProgram[]>{
    return this.http.get<TrainingProgram[]>("http://localhost:8080/api/trainingPrograms/programs/"+companyId);
   }

   removeTrainings(trainingId: number) {
    return this.http.put("http://localhost:8080/api/trainingPrograms/updateStatus/" + trainingId, null, {
      responseType: 'text'
    });
  }

  updateTraining(trainingId: number, updatedProgram: TrainingProgram): Observable<TrainingProgram> {
    return this.http.put<TrainingProgram>(`http://localhost:8080/api/trainingPrograms/update/${trainingId}`, updatedProgram);
  }


}
