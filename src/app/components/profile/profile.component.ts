
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from 'src/app/models/user';
import { UserCoins } from 'src/app/models/userCoins';
interface AppState {
  userCoins:UserCoins[];
  }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
user:User=new User();
userCoins:UserCoins[];
totalValue:number=0;
  constructor(private store: Store<AppState>,private router:Router) { }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('user') );
    this.store.select('userCoins').subscribe(state=> this.userCoins=state);
    this.counterTotalValue();
    console.log(this.userCoins);
    
  }

  addCoins(){
   this.router.navigateByUrl('addCoins');
  }
counterTotalValue(){
  let value=0;
  let coins=0;
  for (let i = 0; i <this.userCoins.length; i++) {
    if(this.userCoins[i].username==this.user.username){     
       value=this.userCoins[i].value;
       coins=this.userCoins[i].coins
       this.totalValue+=value*coins; 
          
    }
    
  }

}

}
