import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCoins } from 'src/app/models/userCoins';
import *as UserCoinsAction from '../../actions/userCoins.action';
import { ToastrService } from 'ngx-toastr';
import { machineState } from 'src/app/models/machineState';
import * as MachineStateAction from '../../actions/machineState.action'
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

  constructor(private store: Store<AppState>,private store1:Store<AppState1>,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.store1.select('machineState').subscribe(state=>this.machineState=state);
    this.username=JSON.parse(localStorage.getItem('user')).username;
    this.store.select('userCoins').subscribe(state=> this.userCoins=state);
    this.store1.select('valueOfPayment').subscribe(state=>this.minimumValue=state-1);
  }
  addCoins(){
    const value=this.item.value*this.item.coins
    if(this.item.value!==undefined && this.item.coins!==undefined){
      if(this.minimumValue<=value){
    const  userCoins=this.userCoins.find(item=>item.value==this.item.value);
    this.store1.select('machineState').subscribe(state=>this.machineState=state);
    this.store.select('userCoins').subscribe(state=> this.userCoins=state);              
    const machineState=this.machineState.find(item=>this.item.value==item.value)
    
    console.log(machineState);                                                      //function for add coins and input check
    if(machineState!==undefined){                                                   //We can't add new values, it can only admin  
    
      this.updateCoins(machineState,this.userCoins,userCoins);
      console.log(this.items);
      
      this.store.dispatch(new UserCoinsAction.UpdateCoins(this.items))
   
  this.toastr.success('Coins were successfully added');
    this.item=new UserCoins();
 
  }
  else{
    this.toastr.error('Value not available');
    
  }
} 
else{
  this.toastr.error(`Minimum value is ${this.minimumValue}`)
}
  }
  else{
    this.toastr.error('All fields must be filled');
  }

  }
  updateCoins(item:machineState,userCoins:UserCoins[],item2:UserCoins){
   if(item2==undefined){
     item2={coins:0,value:this.item.value,username:this.username};
   }
     const UserCoins=userCoins.filter(item=>item.value!==this.item.value)     //function for update coins in state
   const coins= item2.coins+this.item.coins
   userCoins=UserCoins;
   const item1={value:item.value,coins:coins,username:this.username}
   this.items=[...userCoins,item1];
    
  }

}
