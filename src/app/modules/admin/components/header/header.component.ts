import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  firstname: any;
  lastname: any;
  constructor(public auth: AuthService,
                public router: Router) {
    this.firstname = localStorage.getItem('firstname');
    this.lastname = localStorage.getItem('lastname');
  }

  ngOnInit(): void {
  }

}
