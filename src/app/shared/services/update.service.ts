import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedagogicalMonitoring } from '../models/pedagogicalMonitoring.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClient: HttpClient) { }

  updateMonitoring(id: number, data: PedagogicalMonitoring) {
    return this.httpClient.put(`${environment.dbJsonUrl}/acompanhamentos/${id}`, data)
  }
}
