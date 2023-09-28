import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from '../public/public.component';
import { LoginComponent } from '../../../pages/login/login.component';
import { RegisterUserComponent } from '../../../pages/register-user/register-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent,
    PublicComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask(), DatePipe],
})
export class PublicModule { }
