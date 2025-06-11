import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IEPDashboardComponent } from './iep-dashboard/iep-dashboard.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
  { path: 'dashboard', component: IEPDashboardComponent }
];
