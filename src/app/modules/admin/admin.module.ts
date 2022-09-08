import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DesignMapComponent } from './components/design-map/design-map.component';
import { ComponentsheaderComponent } from './componentsheader/componentsheader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftmenuComponent } from './components/leftmenu/leftmenu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxesComponent } from './components/taxes/taxes.component';
import { ComponentsComponent } from './components/components.component';
import { TrucksComponent } from './components/trucks/trucks.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TruckComponent } from './components/truck/truck.component';
import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
   
//import { AppComponent } from './app.component';
   
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { SplashComponent } from './components/splash/splash.component';
import { SplashsComponent } from './components/splashs/splashs.component';
import { FaqComponent } from './components/faq/faq.component';
// import { BrowserModule } from '@angular/platform-browser';
   
// import { AppComponent } from './app.component';
   
// import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    // BrowserModule,
    // DataTablesModule,
    // HttpClientModule
   // AppComponent,
    DesignMapComponent,
    ComponentsheaderComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
    DashboardComponent,
    UsersComponent,
    TaxesComponent,
    ComponentsComponent,
    TrucksComponent,
    ProfileComponent,
    TruckComponent,
    SplashComponent,
    SplashsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [TruckComponent]
})
export class AdminModule { }
