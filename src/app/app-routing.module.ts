import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import {AuthGuard} from "./guards/auth.guard";
// import { AdminModule } from './modules/admin/admin.module';

const routes: Routes = [
  {path: '', redirectTo: 'login',  pathMatch: 'full'},
 {path: 'login', component: LoginComponent},
 {path: 'signup', component:SignupComponent},

  {path: 'admin',
  canActivate: [AuthGuard],
  loadChildren: ()=> 
    import('./modules/admin/admin.module').then((m)=>m.AdminModule)
},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }




