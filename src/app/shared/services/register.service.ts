import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher.model';
import { Student } from '../models/student.model';
import { PedagogicalMonitoring } from '../models/pedagogicalMonitoring.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  postTeacher(data: Teacher) {
    return this.httpClient.post(`${environment.dbJsonUrl}/pedagogos`, data)
  }

  postStudent(data: Student) {
    return this.httpClient.post(`${environment.dbJsonUrl}/alunos`, data)
  }

  postPedagogicalMonitoring(data: PedagogicalMonitoring){
    return this.httpClient.post(`${environment.dbJsonUrl}/acompanhamentos`, data)
  }
}
