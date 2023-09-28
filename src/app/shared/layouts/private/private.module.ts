import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ListMonitoringComponent } from 'src/app/pages/list-monitoring/list-monitoring.component';
import { ListStudentsComponent } from 'src/app/pages/list-students/list-students.component';
import { RegisterMonitoringComponent } from 'src/app/pages/register-monitoring/register-monitoring.component';
import { RegisterStudentComponent } from 'src/app/pages/register-student/register-student.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PrivateComponent } from './private.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormMonitoringComponent } from '../../components/form-monitoring/form-monitoring.component';
import { EditionMonitoringComponent } from 'src/app/pages/edition-monitoring/edition-monitoring.component';


@NgModule({
  declarations: [
    HeaderComponent,
    RegisterStudentComponent,
    ListStudentsComponent,
    RegisterMonitoringComponent,
    ListMonitoringComponent,
    HomeComponent,
    EditionMonitoringComponent,
    FormMonitoringComponent,
    PrivateComponent
  ],

  imports: [
    CommonModule,
    PrivateRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask(), DatePipe],
})
export class PrivateModule { }
