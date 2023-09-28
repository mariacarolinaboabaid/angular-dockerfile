import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { Teacher } from '../../models/teacher.model';
import { ListService } from '../../services/list.service';
import { RegisterService } from '../../services/register.service';
import { PedagogicalMonitoring } from '../../models/pedagogicalMonitoring.model';

@Component({
  selector: 'app-form-monitoring',
  templateUrl: './form-monitoring.component.html',
  styleUrls: ['./form-monitoring.component.css']
})
export class FormMonitoringComponent {

  registerForm: FormGroup
  arrayStudents: Student[] = []
  arrayTeachers: Teacher[] = []
  postData: PedagogicalMonitoring = {
    student: '',
    teacher: '',
    title: '',
    date: '',
    description: '',
    finished: false
  }


  // PARENT COMPONENT EVENT EMIT
  @Output()
  formInformation: EventEmitter<PedagogicalMonitoring> = new EventEmitter<PedagogicalMonitoring>();

  // DATA RECEIVED FROM THE PARENT COMPONENT
  @Input()
  initialData: PedagogicalMonitoring = {
    student: '',
    teacher: '',
    title: '',
    date: '',
    description: '',
    finished: false
  }
  @Input()
  buttonName: string = ""

  constructor(private listService: ListService, private registerService: RegisterService, private datePipe: DatePipe, private route: Router) {

    this.registerForm = new FormGroup({

      'studentName': new FormControl('', Validators.required),

      'teacherName': new FormControl('', Validators.required),

      'title': new FormControl('', Validators.required),

      'date': new FormControl(this.formatCurrentDate(), Validators.required),

      'description': new FormControl('', Validators.required),

      'finished': new FormControl('')
    })
  }

  // LOAD STUDENTS AND TEACHERS
  ngOnInit(): void {
    this.listService.getStudents().subscribe((result) => {
      this.arrayStudents = result;
    })

    this.listService.getTeachers().subscribe((result) => {
      this.arrayTeachers = result;
    })
  }

  // CHECKING IF INITAL DATA IS PASSED FROMPARENT COMPONENT: EDIT MONITORING
  ngOnChanges(): void {

    if (this.initialData && this.initialData.date !== null) {
      const isoFormattedDate = this.convertToIsoDateFormat(this.initialData.date);
      this.initialData.date = this.datePipe.transform(isoFormattedDate, 'yyyy-MM-dd') ?? ''

      this.registerForm.patchValue({
        'studentName': this.initialData.student,

        'teacherName': this.initialData.teacher,

        'title': this.initialData.title,

        'date': this.initialData.date,

        'description': this.initialData.description,

        'finished': this.initialData.finished
      })
    }
  }

  // ERRORS MESSAGES
  validateErrorMessage(field: string) {
    return (this.registerForm.get(field)?.value === null || this.registerForm.get(field)?.value.length === 0) && this.registerForm.get(field)?.touched
  }

  validateSelectErrorMessage(field: string) {
    return (this.registerForm.get(field)?.value === '' || this.registerForm.get(field)?.value === 'Select') && this.registerForm.get(field)?.touched
  }

  // METHODS TO FORMAT THE DATE
  convertToIsoDateFormat(date: string): string {
    const parts = date.split('/')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`
    } 
    else {
      return date;
    }
  }

  formatCurrentDate() {
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentYear = currentDate.getFullYear()
    let currentMonth: string | number = currentDate.getMonth() + 1
    if (currentMonth < 10) {
      currentMonth = `0${currentMonth}`
    }
    return `${currentYear}-${currentMonth}-${currentDay}`
  }

  // METHOD TO EMIT THE FORM DATA TO THE PARENT COMPENENT 
  emitPostData() {

    const student = this.registerForm.get('studentName')?.value
    const teacher = this.registerForm.get('teacherName')?.value
    const title = this.registerForm.get('title')?.value
    let date = this.registerForm.get('date')?.value
    const description = this.registerForm.get('description')?.value
    const finisehd = this.registerForm.get('finished')?.value

    date = this.datePipe.transform(date, 'dd/MM/yyyy')

    this.postData = {
      "student": student,
      "teacher": teacher,
      "title": title,
      "date": date,
      "description": description,
      "finished": finisehd
    }

    this.formInformation.emit(this.postData)
  }
}
