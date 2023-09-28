import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/services/register.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent {

  registerForm: FormGroup

  constructor(private registerService: RegisterService, private router: Router, private datePipe: DatePipe) {
    this.registerForm = new FormGroup({
      "studentName": new FormControl('', Validators.required),

      "studentTelephone": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "studentBirth": new FormControl('', [Validators.required, this.dateBirthValidator()]),

      "studentCPF": new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),

      "studentGrade": new FormControl('', [Validators.required])
    })
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

      const birth = this.registerForm.get('studentBirth')?.value
      const birthYear = parseInt(birth.slice(0, 4))
      const birthMonth = parseInt(birth.slice(5, 7))
      const birthDay = parseInt(birth.slice(8, 10))

      if (birthYear > currentYear) {
        return { 'birthInvalid': true }
      }
      else if (birthYear === currentYear) {
        if (birthMonth > currentMonth) {
          return { 'birthInvalid': true }
        }
        else if (birthMonth === currentMonth && birthDay >= currentDay) {
          return { 'birthInvalid': true }
        }
      }
      return null
    }
  }

  // ERRORS MESSAGES 
  validateErrorMessage(field: string) {
    return (this.registerForm.get(field)?.value === null || this.registerForm.get(field)?.value.length === 0) && this.registerForm.get(field)?.touched
  }

  validateBirthErrorMessage() {
    return this.registerForm.get('studentBirth')?.value.length > 0 && this.registerForm.get('studentBirth')?.errors && this.registerForm.get('studentBirth')?.hasError('birthInvalid')
  }

  // METHOD TO POST NEW STUDENT AND REDIRECT TO LIST-STUDENTS
  register() {
    const name = this.registerForm.get('studentName')?.value
    const phone = this.registerForm.get('studentTelephone')?.value
    let birth = this.registerForm.get('studentBirth')?.value
    const cpf = this.registerForm.get('studentCPF')?.value
    const grade = this.registerForm.get('studentGrade')?.value

    birth = this.datePipe.transform(birth, 'dd/MM/yyyy')

    const postData = {
      "name": name,
      "phone": phone,
      "dateBirth": birth,
      "cpf": cpf,
      "grade": grade
    }

    this.registerService.postStudent(postData)
      .subscribe((result) => {
        console.log(result)
        alert("Student registered with success.")
        this.router.navigate(['/list-students'])
      })
  }


}
