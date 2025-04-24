import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import TrainingProgram from '../app/model/TrainingProgram';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramService {

  private baseUrl = 'http://localhost:8080/api/trainingPrograms';

  constructor(private http: HttpClient) {}

  create(program: TrainingProgram): Observable<TrainingProgram> {
    return this.http.post<TrainingProgram>(`${this.baseUrl}/create`, program);
  }

  update(program: TrainingProgram): Observable<string> {
    return this.http.put(`${this.baseUrl}/update`, program, { responseType: 'text' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>(`${this.baseUrl}/all`);
  }

  searchById(id: number): Observable<TrainingProgram> {
    return this.http.get<TrainingProgram>(`${this.baseUrl}/search/${id}`);
  }

  searchByName(name: string): Observable<TrainingProgram[]> {
    return this.http.get<TrainingProgram[]>(`${this.baseUrl}/searchName/${name}`);
  }
}
