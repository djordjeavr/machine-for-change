import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import * as UserActions from '../../actions/user.actions';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';


interface AppState {
  user:User[];
  }
  
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
username:string;
password:string;
person:User[]=[];


  constructor(private router:Router,private store: Store<AppState>,
    private toastr: ToastrService ) {
   }
 

  ngOnInit(): void {   
   this.store.select('user').subscribe(state=> this.person=state);
  
   
  }
  
  addUser(){
 
  const user=this.person.find(person=>this.username==person.username);
    
    if(this.username!==undefined){ 
      if(this.password!==undefined){
        
        if(user.password==this.password){
          
          localStorage.setItem('user',JSON.stringify(user))      //function to add a new username or  check to admin
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
    this.toastr.success('Welcome');
    this.router.navigateByUrl('addCoins');

}
else{
  this.toastr.error('All fields must be fild in!!!')
  
  
}
  }
  
}
