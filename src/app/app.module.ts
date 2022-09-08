import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { LocationStrategy , HashLocationStrategy , PathLocationStrategy} from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from './components/not-found/not-found.component';
// import {MatDialogModule} from '@angular/material/dialog';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
   
// import { AppComponent } from './app.component';
   
import { DataTablesModule } from 'angular-datatables';
// import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // MatDialogModule,
    ToastrModule.forRoot(),
    // HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
