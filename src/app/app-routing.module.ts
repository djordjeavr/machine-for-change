import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCoinsComponent } from './components/add-coins/add-coins.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';

import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './service/AuthGuard';

const routes: Routes = [
  {path:'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'admin', component:AdminComponent ,canActivate:[AuthGuard]} ,
  {path:'registration', component:RegistrationComponent},
  {path:'addCoins', component:AddCoinsComponent,canActivate:[AuthGuard]},
  { path: '**',   redirectTo: '/home', pathMatch: 'full' },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
