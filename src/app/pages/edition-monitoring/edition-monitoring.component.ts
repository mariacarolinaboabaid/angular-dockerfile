import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedagogicalMonitoring } from 'src/app/shared/models/pedagogicalMonitoring.model';
import { ListService } from 'src/app/shared/services/list.service';
import { UpdateService } from 'src/app/shared/services/update.service';

@Component({
  selector: 'app-edition-monitoring',
  templateUrl: './edition-monitoring.component.html',
  styleUrls: ['./edition-monitoring.component.css']
})
export class EditionMonitoringComponent {

  monitoring_id: string | null  = ''
  monitoring_id_number: number = 0
  monitoring: PedagogicalMonitoring = {
    student: '',
    teacher: '',
    title: '',
    date: '',
    description: '',
    finished: false
  }

  // DATA PASSED DO THE CHILD COMPONENT 
  buttonAction: string = "Update"

  constructor( private route: Router, private activateRoute: ActivatedRoute, private updateService: UpdateService, private listService: ListService) {}

  ngOnInit(){
    // GET THE ID BY THE URL
    this.monitoring_id = this.activateRoute.snapshot.paramMap.get('id')

    if (this.monitoring_id !== null) {
      this.monitoring_id_number = parseInt(this.monitoring_id)
    }
    // PASSING THE DATA OF THE SELECTED MONITORING ID 
    this.listService.getPedagogicalMonitoringById(this.monitoring_id_number).subscribe((result) => {
      this.monitoring = result
      console.log(this.monitoring)
    }) 
  }

  // METHOD FOR UPDATE THE PEDAGOGICAL MONITORING ACCORDING TO DATA PASSED BY THE CHILD COMPONENT
  update(outputData: PedagogicalMonitoring){

    this.monitoring = outputData

    this.updateService.updateMonitoring(this.monitoring_id_number, this.monitoring)
    .subscribe((result: any) => {
      console.log(result)
      alert("Pedagogical monitoring updated with success.")
      this.route.navigate(['/list-monitorings'])
    })
  }
}
