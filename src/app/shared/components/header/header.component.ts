import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private loginService: LoginService, private route: Router){}
  
  logout() {
    localStorage.removeItem('isLoggedIn');
    this.route.navigate(['/login'])
  }

}
