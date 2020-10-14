import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import {reducer} from './reducers/user.reducer';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddCoinsComponent } from './components/add-coins/add-coins.component';
import { UserCoinsReducer } from './reducers/userCoins.reducer';
import { machineStateReducer, valueOfPaymentReducer } from './reducers/machineState.reducer';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent,
    AddCoinsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
       
        positionClass:'toast-top-right',
        preventDuplicates:false
      }
    ), // ToastrModule added
    StoreModule.forRoot({
      user:reducer,
      userCoins:UserCoinsReducer,
      machineState:machineStateReducer,
      valueOfPayment:valueOfPaymentReducer
    }),


    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
