import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from './private.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { ListStudentsComponent } from '../../../pages/list-students/list-students.component';
import { ListMonitoringComponent } from '../../../pages/list-monitoring/list-monitoring.component';
import { RegisterStudentComponent } from '../../../pages/register-student/register-student.component';
import { RegisterMonitoringComponent } from '../../../pages/register-monitoring/register-monitoring.component';
import { EditionMonitoringComponent } from 'src/app/pages/edition-monitoring/edition-monitoring.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent,
    children: [
      { path: 'home', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'list-students', component: ListStudentsComponent },
      { path: 'list-monitorings', component: ListMonitoringComponent},
      { path: 'register-student', component: RegisterStudentComponent},
      { path: 'register-monitoring', component: RegisterMonitoringComponent},
      { path: 'edit-monitoring/:id', component: EditionMonitoringComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
