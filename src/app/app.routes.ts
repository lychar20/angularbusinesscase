import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth/auth.guard';
import { noAuthGuard } from './guards/no-auth/no-auth.guard';
import { PowerListComponent } from './pages/power-list/power-list.component';
import { AddPowerComponent } from './pages/add-power/add-power.component';
import { PowerDetailComponent } from './pages/power-detail/power-detail.component';
import { EditPowerComponent } from './pages/edit-power/edit-power.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CharginStationsListComponent } from './pages/chargin-stations-list/chargin-stations-list.component';
import { AddBookingComponent } from './pages/add-booking/add-booking.component';

export const routes: Routes = [
    {path: '', canActivate: [noAuthGuard], component: WelcomeComponent},
    {path: 'login', canActivate: [noAuthGuard], component: LoginComponent},
    {path: 'register', canActivate: [noAuthGuard], component: RegisterComponent},
    {path: 'dasboard', canActivate: [authGuard], component: DashboardComponent},
    {path: 'chargin-stations-list', canActivate: [authGuard], component: CharginStationsListComponent},



    {path: 'booking', canActivate: [authGuard], children: [
      {path: ':id', component: AddBookingComponent}
     // {path: 'edit/:id', component: EditPowerComponent},
     // {path: ':id', component: PowerDetailComponent},
  ]},



    {path: 'power', canActivate: [authGuard], children: [
        {path: '', redirectTo:'list', pathMatch: 'full'},
        {path: 'list', component: PowerListComponent},
        {path: 'add', component: AddPowerComponent},
        {path: 'edit/:id', component: EditPowerComponent},
        {path: ':id', component: PowerDetailComponent},
    ]},

    {path: 'forbidden', component: ForbiddenComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: 'not-found'}

];
