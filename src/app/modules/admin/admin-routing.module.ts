import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DesignMapComponent } from './components/design-map/design-map.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TaxesComponent } from './components/taxes/taxes.component';
import { TruckComponent } from './components/truck/truck.component';
import { TrucksComponent } from './components/trucks/trucks.component';
import { UsersComponent } from './components/users/users.component';
import { SplashComponent } from './components/splash/splash.component';
import { FaqComponent } from './components/faq/faq.component';


const routes: Routes = [
  {path: '', component: DesignMapComponent, children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'users/:role', component: UsersComponent},
      {path: 'taxes', component: TaxesComponent},
      {path: 'trucks', component: TrucksComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'truck', component: TruckComponent},
      {path: 'splash', component: SplashComponent},
      {path: 'faq', component: FaqComponent},



      {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'},
      {path: '**', component: NotFoundComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
