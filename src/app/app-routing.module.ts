import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCoinsComponent } from './components/add-coins/add-coins.component';
import { SetInitialStateComponent } from './components/set-initial-state/set-initial-state.component';
import { AuthGuard } from './service/AuthGuard';

const routes: Routes = [
  { path: 'addCoins', component: AddCoinsComponent, canActivate: [AuthGuard] },
  { path: 'set-initial-state', component: SetInitialStateComponent },
  { path: '**', redirectTo: '/addCoins', pathMatch: 'full' },
  { path: '', redirectTo: '/addCoins', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
