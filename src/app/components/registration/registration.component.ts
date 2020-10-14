import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {AppState} from '../../app.state'
import * as UserActions from '../../actions/user.actions';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import * as MachineStateAction from '../../actions/machineState.action'
import *as UserCoinsAction from '../../actions/userCoins.action';

  
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
username:string;
password:string;
person:User[]=[];
valueOfPayment:number;

  constructor(private router:Router,private store: Store<AppState>,
    private toastr: ToastrService ) {
   }
 

  ngOnInit(): void {   
   this.store.select('user').subscribe(state=> this.person=state); 
   localStorage.removeItem('user');
   this.store.dispatch(new UserCoinsAction.RemoveUser([]));

  }
  
  setInitialState(){
  const user=this.person.find(person=>this.username==person.username);
    
    if(this.username!==undefined && this.valueOfPayment!==undefined){
     
       
      if(this.password!==undefined){
        if(user.password==this.password){
          
          localStorage.setItem('user',JSON.stringify(user))      //function to add a new username or  check to admin
          this.store.dispatch(new MachineStateAction.ChangeValueOfPayment(this.valueOfPayment));
          this.valueOfPayment=undefined;
          this.toastr.success('Welcome');
          this.router.navigateByUrl('addCoins');
          return;
        }
        else {
          this.toastr.error('Password is incorrect');
          this.username=undefined;
          this.password=undefined;
          return;
          
        }
    }  
    this.store.dispatch(new UserActions.AddUser({username:this.username,password:this.password,role:'USER'}));
    this.store.select('user').subscribe(state=> this.person=state);
    localStorage.setItem('user',JSON.stringify({username:this.username,role:'USER'}))
    this.store.dispatch(new MachineStateAction.ChangeValueOfPayment(this.valueOfPayment));
    this.valueOfPayment=undefined;
    this.toastr.success('Welcome');
    this.router.navigateByUrl('addCoins');

}
else{
  this.toastr.error('All fields must be fild in!!!')
  
  
}
  }
  
}
