import { SharedModule } from './../../shared/modules/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { DevExtremeModule } from 'devextreme-angular';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { EventComponent } from './event/event.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DevExtremeModule

  ]
})
export class HomeModule { }
