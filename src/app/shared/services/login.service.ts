import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../models/teacher.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<Teacher[]>(`${environment.dbJsonUrl}/pedagogos`)
  }

  loggedCheck(){
    let isLoggedIn = localStorage.getItem('isLoggedIn') 
    if (isLoggedIn === null) {
      isLoggedIn = "false"
      return false
    }
    else {
      return true
    }
  }
}
