import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCoins } from 'src/app/models/userCoins';
import *as UserCoinsAction from '../../actions/userCoins.action';
import { ToastrService } from 'ngx-toastr';
import { machineState } from 'src/app/models/machineState';
import * as MachineStateAction from '../../actions/machineState.action'
import { Router } from '@angular/router';
interface AppState {
  userCoins:UserCoins[];
  }
  interface AppState1 {
    valueOfPayment:number,
    machineState:machineState[];
    }
@Component({
  selector: 'app-add-coins',
  templateUrl: './add-coins.component.html',
  styleUrls: ['./add-coins.component.scss']
})
export class AddCoinsComponent implements OnInit {
userCoins:UserCoins[]=[];
items:any[];
username:string;
item:UserCoins=new UserCoins();
machineState:machineState[]=[];
minimumValue:number;
totalValue:number=0;
isClicked:boolean=false;
  constructor(private store: Store<AppState>,private store1:Store<AppState1>,private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.store1.select('machineState').subscribe(state=>this.machineState=state);
    this.username=JSON.parse(localStorage.getItem('user')).username;
    this.store.select('userCoins').subscribe(state=> this.userCoins=state);
    this.store1.select('valueOfPayment').subscribe(state=>this.minimumValue=state);
    this.counterTotalValue();
    this.isClicked=false;
  }
  addCoins(){
    if(this.item.value!==undefined && this.item.coins!==undefined){
     

    const  userCoins=this.userCoins.find(item=>item.value==this.item.value);
    this.store1.select('machineState').subscribe(state=>this.machineState=state);
    this.store.select('userCoins').subscribe(state=> this.userCoins=state);                                                          
      this.updateCoins(this.userCoins,userCoins);       //function for add coins and input check
      
      this.store.dispatch(new UserCoinsAction.UpdateCoins(this.items))
      this.counterTotalValue(); 
  this.toastr.success('Coins were successfully added');
    this.item=new UserCoins();

  }
  else{
    this.toastr.error('All fields must be filled');
  }

  }
  updateCoins(userCoins:UserCoins[],item2:UserCoins){
    
   if(item2==undefined){
     item2={coins:0,value:this.item.value,username:this.username};
   }
     const UserCoins=userCoins.filter(item=>item.value!==this.item.value)     //function for update coins in state
   const coins= item2.coins+this.item.coins
   userCoins=UserCoins;
   const item1={value:this.item.value,coins:coins,username:this.username}
   this.items=[...userCoins,item1];
    
  }
  counterTotalValue(){
    console.log(this.userCoins);
    this.totalValue=0;
    let value=0;
    let coins=0;
    let x=0
    for (let i = 0; i <this.userCoins.length; i++) {    
     
         value=this.userCoins[i].value;
         coins=this.userCoins[i].coins;
         x=value*coins
         this.totalValue+=x;
    }
    
    
  }

  ContinueToPayment(){
 const value =this.totalValue-this.minimumValue  
    
    if(value-Math.floor(value)!==0){
      this.toastr.warning('Must be an integer');
      return;
    }
    if(this.minimumValue<=this.totalValue){ 
      if(this.isClicked==false){
        this.isClicked=true
      }
      else{
        this.isClicked=false;
      }
}
else{
  this.toastr.error('You dont have enough coins');
}
  }
  stateChange(isClicked){
    isClicked=false;
    this.totalValue=0;
    this.counterTotalValue();
    this.isClicked=isClicked
  }

}

