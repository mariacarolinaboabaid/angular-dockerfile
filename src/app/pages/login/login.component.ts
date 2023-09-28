import { Component } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { Teacher } from '../../shared/models/teacher.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userEmailInput: string = ''
  userPasswordInput: string = ''
  users: Teacher[] = []
  validationEmail: boolean = false
  validationPassword: boolean = false
  hideMessageErrorPassword: boolean = true
  hideMessageErrorEmail: boolean = true
  message: string = ''
  
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(){
    let isLoggedIn = this.loginService.loggedCheck()
  }

  login() {
    // GETTING THE REGISTERED USERS
    this.loginService.getUsers()
      .subscribe((result) => {
        this.users = result

        this.validationEmail = false
        this.validationPassword = false
        this.hideMessageErrorPassword = true
        this.hideMessageErrorEmail = true

        // CHECKING IF IT MATCH WITH THE INPUT INFORMATION
        for (let user of this.users) {
          if (this.userEmailInput === user.email) {
            this.validationEmail = true

            if (this.userPasswordInput === user.password) {
              this.validationPassword = true
              break
            }
          }
        }

        if (this.validationEmail === true && this.validationPassword === true) {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home'])
        }
        else if (this.validationEmail === true && this.validationPassword === false) {
          console.log("senha errada")
          this.hideMessageErrorPassword = false
        }
        else if (this.validationEmail === false) {
          console.log("usuário inexistente")
          this.hideMessageErrorEmail = false
        }
      })
  }

  // METHOD TO REDIRECT TO REGISTER
  redirectRegisterUser() {
    this.router.navigate(['/register'])
  }
}


