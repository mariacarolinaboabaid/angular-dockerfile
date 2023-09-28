import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Teacher } from '../models/teacher.model';
import { PedagogicalMonitoring } from '../models/pedagogicalMonitoring.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ListService {

   constructor(private httpClient: HttpClient) { }

  getStudents() {
    return this.httpClient.get<Student[]>(`${environment.dbJsonUrl}/alunos?_sort=name&_order=asc`)
  }

  getTeachers() {
    return this.httpClient.get<Teacher[]>(`${environment.dbJsonUrl}/pedagogos`)
  }

  getPedagogicalMonitoring() {
    return this.httpClient.get<PedagogicalMonitoring[]>(`${environment.dbJsonUrl}/acompanhamentos?_sort=title&_order=asc`)
  }

  getPedagogicalMonitoringById(id: number) {
    return this.httpClient.get<PedagogicalMonitoring>(`${environment.dbJsonUrl}/acompanhamentos/${id}`)
  }
}
