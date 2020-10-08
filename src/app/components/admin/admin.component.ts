import { Component, OnInit } from '@angular/core';
import {machineState} from '../../models/machineState'
import * as MachineStateAction from '../../actions/machineState.action'
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

interface AppState {
  valueOfPayment:number,
  machineState:machineState[];
  }
  
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
values:machineState=new machineState();
machineState:machineState[]=[];
items:machineState[];
valueOfPayment:number;
value:number;
  constructor(private store: Store<AppState>, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.store.select('machineState').subscribe(state=>this.machineState=state);
    console.log(this.machineState);
   this.store.select('valueOfPayment').subscribe(state=>this.value=state);
    
    
  }
  ChangeValueOfPayment(){
    this.store.dispatch(new MachineStateAction.ChangeValueOfPayment(this.valueOfPayment));
    this.valueOfPayment=undefined;
  }    

  AddValue(){
    
    const sameValue=this.machineState.find(value=> this.values.value==value.value);
    console.log(sameValue);
    
    if(this.values.value!==undefined && this.values.coins!==undefined){ 
    if(sameValue==undefined){ 
    console.log(this.values);
    this.store.dispatch(new MachineStateAction.AddCoins(this.values));
    this.store.select('machineState').subscribe(state=> this.machineState=state);     //function for add values and coins(update coins) and input check 
    console.log(this.machineState);
    this.toastr.success('Coins and value were successfully added');
    this.values=new machineState();
  }
  else{
    this.toastr.warning('The value already exists');
    this.updateCoins(sameValue,this.machineState);
      console.log(this.items);
      this.store.dispatch(new MachineStateAction.UpdateCoins(this.items))
    this.values=new machineState();   
  }
} 
else{
  this.toastr.error('All fields must be filled');
}
  }
  updateCoins(item:machineState,machineState:machineState[]){
   
    const UserCoins=machineState.filter(item=>item.value!==this.values.value)  // update coins
  const coins= item.coins+this.values.coins
  machineState=UserCoins;
  const item1={value:item.value,coins:coins}
  this.items=[...machineState,item1];
   
 }
}
