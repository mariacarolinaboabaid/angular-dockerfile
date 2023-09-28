import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/models/student.model';
import { ListService } from 'src/app/shared/services/list.service';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  arrayStudents: Student[] = []
  orignalArrayStudents: Student[] = []
  userSearch: string = ''

  constructor(private listService: ListService, private router: Router) { }

  // LOAD DATA OF THE CARS
  ngOnInit(): void {
    this.listService.getStudents().subscribe((result) => {
      this.arrayStudents = result;
      this.orignalArrayStudents = [...result]
    })
  }

  // METHOD FILTER BY THE USER SEARCH
  search(){
    if(this.userSearch){
      this.arrayStudents = this.orignalArrayStudents.filter(student => student.name.toLowerCase().includes(this.userSearch.toLowerCase()))
      if (this.arrayStudents.length === 0){
        this.arrayStudents = this.orignalArrayStudents
        alert("No students registered under this name!")
      }
    }
    else if (this.userSearch === ''){
      this.arrayStudents = [...this.orignalArrayStudents];
    }
  }
  
  // METHOD TO REDIRECT TO REGISTER 
  redirectToRegister(){
    this.router.navigate(['/register-student'])
  }
}

