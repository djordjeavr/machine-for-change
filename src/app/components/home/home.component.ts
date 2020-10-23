import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {machineState} from '../../models/machineState'
import * as MachineStateAction from '../../actions/machineState.action'
import { UserCoins } from 'src/app/models/userCoins';
import *as UserCoinsAction from '../../actions/userCoins.action';
import {Store} from '@ngrx/store'

import { UserService } from 'src/app/service/UserService';

import { ToastrService } from 'ngx-toastr';

import { AppState } from 'src/app/app.state';



 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userCoins:UserCoins[]=[];
  
  machineState:machineState[]=[];
  valueOfPayment:number;
  item:machineState=new machineState();
  items:machineState[]=[];
  isClicked:boolean=false;
  initialMachineState:machineState[]=[];
  initialUserState:UserCoins[]=[];
  initialState:boolean=false;
  constructor( private store: Store<AppState>, 
    private UserService:UserService, private toastr:ToastrService) { }

@Input() totalValue:number;

@Output() stateChange:EventEmitter<boolean>=new EventEmitter();
  ngOnInit(): void {
    this.store.select('machineState').subscribe(state=>this.machineState=state);
    this.store.select('userCoins').subscribe(state=>this.userCoins=state)
    this.store.select('valueOfPayment').subscribe(state=>this.valueOfPayment=state); 
   this.initialMachineState=this.machineState;
   this.initialUserState=this.userCoins;
  this.initialState=false;
  }
  counterTotalValue(){
    console.log(!this.userCoins);
    
    this.totalValue=0;
      let value=0;
      let coins=0;
      let x=0
      if(!this.userCoins){
        this.totalValue=0;
        return;
      }
      
      for (let i = 0; i <this.userCoins.length; i++) {    
           value=this.userCoins[i].value;
           coins=this.userCoins[i].coins;
           x+=value*coins
    
        
      }
      this.totalValue+=x; 
    
    
  }
  //function for payment
  Pay(){  
        if(this.totalValue>=this.valueOfPayment){ 
         if(this.totalValue==this.valueOfPayment){
          this.MachineIncreaseCoins( );
           this. UserCoinsReducing();
           this.counterTotalValue();
           console.log(this.machineState);
           console.log(this.userCoins);
           this.toastr.success(`Succesfuly payment`);
         }
         else if(this.totalValue>this.valueOfPayment){
           const userCoins=this.userCoins;
          this. MachineIncreaseCoins();
          this. UserCoinsReducing();
          this.CounterCoins();
          if(this.initialState==false){ 
          this.MachineCoinsReducing(userCoins)
          this.UserIncreaseCoins(userCoins);
         this.store.select('machineState').subscribe(state=>this.machineState=state);
         this.store.select('userCoins').subscribe(state=> this.userCoins=state);  
                console.log(this.machineState);
                console.log(this.userCoins);
                this.toastr.success(`Succesfuly payment`);
                this.item=new machineState();
                this.items=[];
              }
              else{
                this.toastr.warning('The machine does not have enough coins. Try again');
              }
        }
      } 
      else{
        this.toastr.error('You dont have enough coins');
      } 
  
  }
  //coin return calculation function
  CounterCoins(){
  const values=this.totalValue-this.valueOfPayment;
  const value =this.machineState.find(value=>value.value==values);
  if(value!==undefined){
   
  this.item={value:value.value,coins:1}; 
  return;
  }
 if(values%2==0){ 
  this.EvenNumbers(values)

}
 if(values%2!==0){
  this.OddNumbers(values) 



  }
 
}
//function for increasing the coins in machine
  MachineIncreaseCoins(){
    let items:machineState[]=[];
      for(let item of this.userCoins){ 
    const MachineCoins=this.machineState.filter(item1=>item.value!==item1.value)
   const machineCoins =this.machineState.find(item2=>item.value==item2.value);
   
   if(machineCoins!==undefined){ 
   this.machineState=MachineCoins;
   console.log(this.machineState);
   
   const coins=machineCoins.coins+item.coins;
    items=[...this.machineState,{value:item.value,coins:coins}];
 
  
  }
  else if(machineCoins==undefined){
    items=[...this.machineState,{value:item.value,coins:item.coins}];
  } 
    this.store.dispatch(new MachineStateAction.UpdateCoins(items));
    
  }
  }
  //reducing coins user
  UserCoinsReducing(){
    let items:UserCoins[]=[]
    for(let item of this.userCoins){ 
    const UserCoins=this.userCoins.filter(person=>person.value!==item.value)
      
   this.userCoins=UserCoins;
    items=[...this.userCoins];
    
    
    this.store.dispatch(new UserCoinsAction.UpdateCoins(items))
    }
  }
  // increasing user the coins 
UserIncreaseCoins(userCoins:UserCoins[]){
  let items:UserCoins[]=[]
    
  if(this.items.length!==2){ 

   items=[{value:this.item.value,coins:this.item.coins}];

}
else if(this.items.length==2){
  

  items=[{value:this.items[0].value,coins:this.items[0].coins},
  {value:this.items[1].value,coins:this.items[1].coins}]

}
  this.store.dispatch(new UserCoinsAction.UpdateCoins(items))
  this.counterTotalValue();

}
//increasing coins in the machine
MachineCoinsReducing(userCoins:UserCoins[]){
  let items:machineState[]=[];
  if(this.items.length!==2){
  
  const  machineState=this.machineState.find(value=> this.item.value==value.value);
  const MachineCoins=this.machineState.filter(item1=>this.item.value!==item1.value)
  const coins=  machineState.coins-this.item.coins;
  
 this.machineState=MachineCoins;
   items=[...this.machineState,{value:machineState.value,coins:coins}];

}

else if(this.items.length==2){
  
  const  machineState=this.machineState.find(value=> this.items[0].value==value.value);
  const machineState1=this.machineState.find(value=> this.items[1].value==value.value);
  const MachineCoins=this.machineState.filter(item=>item.value!==this.items[1].value && item.value!==this.items[0].value)
  const coins1= machineState.coins-this.items[0].coins;
  const coins2= machineState1.coins-this.items[1].coins;
  this.machineState=MachineCoins;
  items=[...this.machineState,{value:this.items[0].value,coins:coins1},{value:this.items[1].value,coins:coins2}]
  
  
}
  this.store.dispatch(new MachineStateAction.UpdateCoins(items))

}
EvenNumbers(values:number){
  const x=values/2
 let item=this.machineState.find(user=>user.value==x&&user.coins>=2);
 const two=this.machineState.find(item=>item.value==2);
 const one=this.machineState.find(item=>item.value==1);
    if(item!==undefined){ 
       this.item={value:x,coins:2};
       
    }
    else if(item==undefined){
      if(two==undefined||two.coins<=0 || two.coins<x){
        this.item={value:1,coins:values};
        console.log(this.item);
        if(one==undefined || one.coins<x || one.coins<=0){ 
        this.store.dispatch(new UserCoinsAction.UpdateCoins(this.initialUserState));
        this.store.dispatch( new MachineStateAction.UpdateCoins(this.initialMachineState));
        this.initialState=true;
      }
      }
      else{ 
         this.item={value:2,coins:x};
        }
         
    }
  
}
OddNumbers(value:number){
  const two=this.machineState.find(item=>item.value==2);
  const one=this.machineState.find(item=>item.value==1);
  let largest=0;
  for(let element of this.machineState){
    if(element.value>=largest){
     let item =element.value
      if(value>item){
        largest=item
      }
    } 
  }
  const a=this.machineState.find(item=>item.value==largest); 
  for(let i=a.coins;i>0;i--){
    const x=largest*i;
    
    if(value==x){
      console.log('dddd');
      this.item={value:largest,coins:i};
      return;
    }
    else if(value!==x&&x<value){
           const y=value-x;
           const item=this.machineState.find(item1=>item1.value==y); 
           console.log(item);
           
           if(item!==undefined){ 
            this.items=[{value:largest,coins:i},{value:y,coins:1}];
            return;
           }  
         if(y%2==0){
           let c=y/2;
           let item=this.machineState.find(user=>user.value==c&&user.coins>=2);
           if(item!==undefined){ 
           this.items=[{value:largest,coins:i},{value:c,coins:2}];
           return;
          }
          else if(item==undefined){
            if(two==undefined||two.coins<=0 || two.coins<c){
              if(one==undefined || one.coins<=0 || one.coins<y){
                this.store.dispatch(new UserCoinsAction.UpdateCoins(this.initialUserState));
                this.store.dispatch( new MachineStateAction.UpdateCoins(this.initialMachineState));
                this.initialState=true;
              }
              else{
                this.items=[{value:largest,coins:i},{value:1,coins:y}];
                return;
              }
            }
            else{
              this.items=[{value:largest,coins:i},{value:2,coins:c}];
              return;
            }
          }
         }
         else if (y%2!==0){
         value=y;
          return;
      }          
    }
  }
}
backToAddCoins(){
  this.stateChange.emit(this.isClicked)
} 
}

