import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './components/dashboard/dash-content/home/home.component';
import { StatisticsComponent } from './components/dashboard/dash-content/statistics/statistics.component';
import { SettingsComponent } from './components/dashboard/dash-content/settings/settings.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children : [
      {path: "home",  component: HomeComponent},
      {path: "statistics", component: StatisticsComponent},
      {path: "settings", component: SettingsComponent},
      {path: "", redirectTo: "home", pathMatch: 'full'}
    ]
  },
  {path: "", redirectTo: "login", pathMatch: 'full'}
  // {path: "**", title: "404", component: PageNotFound'}
];
