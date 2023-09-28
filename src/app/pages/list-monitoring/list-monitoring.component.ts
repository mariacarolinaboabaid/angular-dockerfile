import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedagogicalMonitoring } from 'src/app/shared/models/pedagogicalMonitoring.model';
import { ListService } from 'src/app/shared/services/list.service';

@Component({
  selector: 'app-list-monitoring',
  templateUrl: './list-monitoring.component.html',
  styleUrls: ['./list-monitoring.component.css']
})
export class ListMonitoringComponent {

  arrayMonitoring: PedagogicalMonitoring[] = []
  orignalArrayMonitoring: PedagogicalMonitoring[] = []
  userSearch: string = ''

  constructor(private listService: ListService, private route: Router) { }

  // LOAD DATA OF THE CARDS
  ngOnInit(): void {
    this.listService.getPedagogicalMonitoring().subscribe((result) => {
      this.arrayMonitoring = result;
      this.orignalArrayMonitoring = [...result]
    })
  }

  // METHOD FILTER BY THE USER SEARCH 
  search() {
    if (this.userSearch) {
      this.arrayMonitoring = this.orignalArrayMonitoring.filter(monitoring => monitoring.title.toLowerCase().includes(this.userSearch.toLowerCase()))
      if (this.arrayMonitoring.length === 0) {
        this.arrayMonitoring = this.orignalArrayMonitoring
        alert("No pedagogical monitoring registered under this title")
      }
    }
    else if (this.userSearch === '') {
      this.arrayMonitoring = this.orignalArrayMonitoring
    }
  }

  // METHOD TO REDIRECT TO REGISTER 
  redirectToRegister() {
    this.route.navigate(['/register-monitoring'])
  }

  // METHOD TO REDIRECT TO URL PASSING THE PARAMS 'ID' OF THE CARD
  redirectToEdit(id: number | undefined) {
    this.route.navigate([`edit-monitoring/${id}`])
  }
}
