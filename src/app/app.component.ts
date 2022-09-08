import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  title = 'camio';
  constructor(
    public router: Router
  ) { }
  ngOnInit()
{
  this.router.navigate(['/login']);
}


}
