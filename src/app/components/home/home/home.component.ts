import { AutenticationService } from './../../../shared/service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginUser: any;

  constructor(public autenticationService : AutenticationService) { }

  ngOnInit(): void {
    this.loginUser = this.autenticationService.getSessionUser();
  }
}
