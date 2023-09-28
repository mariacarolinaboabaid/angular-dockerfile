import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/services/register.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  registerForm: FormGroup

  constructor(private registerService: RegisterService, private datePipe: DatePipe, private router: Router) {
    this.registerForm = new FormGroup({
      "userName": new FormControl('', Validators.required),

      "userTelephone": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "userBirth": new FormControl('', [Validators.required, this.dateBirthValidator()]),

      "userCPF": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "userEmail": new FormControl('', [Validators.required, Validators.email]),

      "userPassword": new FormControl('', [Validators.required, Validators.min(8)]),

      "userConfirmPassword": new FormControl('', [Validators.required, Validators.min(8), this.confirmPasswordValidator()]),
    })
  }

  // VALIDATING THE CONFIRM PASSWORD
  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.registerForm == null) {
        return null
      }
      const password = this.registerForm.get('userPassword')?.value
      const confirmPassword = this.registerForm.get('userConfirmPassword')?.value
      if (password != confirmPassword) {
        return { 'confirmPasswordInvalid': true }
      }
      else {
        return null
      }
    }
  }

  // VALIDATING THE BIRTH DATE
  dateBirthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.registerForm == null) {
        return null
      }
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear()
      const currentMonth = currentDate.getMonth() + 1
      const currentDay = currentDate.getDate()

      const userBirth = this.registerForm.get('userBirth')?.value
      const userBirthYear = parseInt(userBirth.slice(0, 4))
      const userBirthMonth = parseInt(userBirth.slice(5, 7))
      const userBirthDay = parseInt(userBirth.slice(8, 10))

      if (userBirthYear > currentYear) {
        return { 'birthInvalid': true }
      }
      else if (userBirthYear === currentYear) {
        if (userBirthMonth > currentMonth) {
          return { 'birthInvalid': true }
        }
        else if (userBirthMonth === currentMonth && userBirthDay >= currentDay) {
          return { 'birthInvalid': true }
        }
      }
    return null
    }
  }

  // ERRORS MESSAGES
  validateErrorMessage(field: string) {
    return this.registerForm.get(field)?.value.length === 0 && this.registerForm.get(field)?.touched
  }

  validatePasswordLengthErrorMessage(field: string) {
    return this.registerForm.get(field)?.value.length > 0 && this.registerForm.get(field)?.value.length < 8 && this.registerForm.get(field)?.touched
  }

  validateConfirmPasswordErrorMessage() {
    return this.registerForm.get('userConfirmPassword')?.value.length > 0 && this.registerForm.get('userConfirmPassword')?.errors && this.registerForm.get('userConfirmPassword')?.hasError('confirmPasswordInvalid')
  }

  validateBirthErrorMessage() {
    return this.registerForm.get('userBirth')?.value.length > 0 && this.registerForm.get('userBirth')?.errors && this.registerForm.get('userBirth')?.hasError('birthInvalid')
  }

  // METHOD TO POST THE NEW TEACHER AND REDIRECT TO HOME
  register() {
    const name = this.registerForm.get('userName')?.value 
    const phone = this.registerForm.get('userTelephone')?.value 
    let birth = this.registerForm.get('userBirth')?.value 
    const cpf = this.registerForm.get('userCPF')?.value 
    const email = this.registerForm.get('userEmail')?.value 
    const password = this.registerForm.get('userPassword')?.value 

    birth = this.datePipe.transform(birth, 'dd/MM/yyyy')
    
    const postData = {
      "name": name,
      "phone": phone,
      "dateBirth": birth,
      "cpf": cpf,
      "email": email,
      "password": password 
    }

    this.registerService.postTeacher(postData)
    .subscribe((result) => {
      console.log(result)
      alert("User registered with success.")
      this.router.navigate(['/login'])
    })
  }
}

