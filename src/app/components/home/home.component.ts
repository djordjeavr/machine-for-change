import { Component, OnInit } from '@angular/core';
import {machineState} from '../../models/machineState'
import * as MachineStateAction from '../../actions/machineState.action'
import { UserCoins } from 'src/app/models/userCoins';
import *as UserCoinsAction from '../../actions/userCoins.action';
import {Store} from '@ngrx/store'
import { UserCoinsReducer } from 'src/app/reducers/userCoins.reducer';
import { UserService } from 'src/app/service/UserService';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ToastrService } from 'ngx-toastr';


  interface AppState {
    machineState:machineState[];
    valueOfPayment:number;
    userCoins:UserCoins[];
    }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  value:number;
  coins:number;
  userCoins:UserCoins[]=[];
  machineState:machineState[]=[];
  valueOfPayment:number;
  item:machineState=new machineState();
  items:machineState[]=[];
  constructor( private store: Store<AppState>, private store1:Store<AppState>,
    private UserService:UserService, private toastr:ToastrService) {
 
      
   }

  ngOnInit(): void {
    this.store1.select('machineState').subscribe(state=>this.machineState=state);
    this.store.select('userCoins').subscribe(state=> this.userCoins=state); 
    this.store.select('valueOfPayment').subscribe(state=>this.valueOfPayment=state); 
  console.log(this.machineState);
  console.log(this.userCoins);


  
  }
  //function for payment
  Pay(){  
    
    const machineState=this.machineState.find(value=> this.value==value.value);
    const user =this.userCoins.find(person=> this.value==person.value);
   if( machineState!==undefined){ 
    let userTotalValue=0;
    if(this.value!==undefined && this.coins!==undefined){
      userTotalValue=this.value*this.coins;
      const values=userTotalValue-this.valueOfPayment;
      if(values-Math.floor(values)!==0){
        this.toastr.warning('Must be an integer');
        return;
      }
      if(user!==undefined){ 
        if(user.coins>=this.coins){           
        
         if(userTotalValue==this.valueOfPayment){
           this. UserCoinsReducing(user);
          this.MachineIncreaseCoins( machineState);
          this.store1.select('machineState').subscribe(state=>this.machineState=state);
    this.store.select('userCoins').subscribe(state=> this.userCoins=state);  
           console.log(this.machineState);
           console.log(this.userCoins);
           this.value=undefined;
           this.coins=undefined;
           this.toastr.success('Succesfuly payment');
         }
         else if(userTotalValue>this.valueOfPayment){
           this. UserCoinsReducing(user);
           this. MachineIncreaseCoins( machineState);
          this.CounterCoins(userTotalValue);
         this.MachineCoinsReducing(this.item)
         this.UserIncreaseCoins(this.item);
         this.store1.select('machineState').subscribe(state=>this.machineState=state);
         this.store.select('userCoins').subscribe(state=> this.userCoins=state);  
                console.log(this.machineState);
                console.log(this.userCoins);
                this.value=undefined;
                this.coins=undefined;
                this.toastr.success('Succesfuly payment');
         }
         else{
          this.toastr.error('You dont have enough coins ');
         }
        }
        }
        else{
          this.toastr.error('You dont have enough coins ')
        }
    }
    else{
      this.value=undefined;
      this.coins=undefined;
      this.toastr.error('All fields must be fild in!!!');
    }
  }
  else{
    this.toastr.error('The value not available ');
  }
  }
  //coin return calculation function
  CounterCoins(userTotalValue:number){
    userTotalValue=this.value*this.coins;
    const values=userTotalValue-this.valueOfPayment;
    
    
  
  const value =this.machineState.find(value=>value.value==values);
  if(value!==undefined){
   
  this.item={value:value.value,coins:1}; 
  console.log(this.item);
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
  MachineIncreaseCoins(sameValue:machineState){
      
    const MachineCoins=this.machineState.filter(item=>item.value!==this.value)
    const coins= sameValue.coins+this.coins
   this.machineState=MachineCoins;
    const items=[...this.machineState,{value:this.value,coins:coins}];

    
    this.store.dispatch(new MachineStateAction.UpdateCoins(items))
  }
  //reducing coins user
  UserCoinsReducing(user:UserCoins){
    const UserCoins=this.userCoins.filter(person=>person.value!==this.value)
    const coins= user.coins-this.coins;
   this.userCoins=UserCoins;
    const items=[...this.userCoins,{value:this.value,coins:coins,username:this.UserService.loggedUser.username}];
    this.store.dispatch(new UserCoinsAction.UpdateCoins(items))
  }
  // increasing user the coins 
UserIncreaseCoins(item:machineState){
  let items:UserCoins[]=[]
  if(this.items.length!==2){ 
  const user =this.userCoins.find(person=> item.value==person.value);
  const UserCoins=this.userCoins.filter(person=>person.value!==item.value);
  this.userCoins=UserCoins;
  if(user!==undefined){ 
  const coins= user.coins+item.coins;
   items=[...this.userCoins,{value:item.value,coins:coins,username:this.UserService.loggedUser.username}];
  }
  else{
    items=[...this.userCoins,{value:item.value,coins:item.coins,username:this.UserService.loggedUser.username}]
  }
}
else if(this.items.length==2){
  
  const user =this.userCoins.find(person=> this.items[0].value==person.value);
  const user1 =this.userCoins.find(person=> this.items[1].value==person.value);
  const UserCoins=this.userCoins.filter(item=>item.value!==this.items[1].value && item.value!==this.items[0].value);
  this.userCoins=UserCoins;
  if(user1==undefined){ 
  const coins=user.coins+this.items[0].coins;
  const coins1=user1.coins+this.items[1].coins
  items=[...this.userCoins,{value:this.items[0].value,coins:coins,username:this.UserService.loggedUser.username},
  {value:this.items[1].value,coins:coins1,username:this.UserService.loggedUser.username}
]
}
else{
  items=[...this.userCoins,{value:this.items[0].value,coins:this.items[0].coins,username:this.UserService.loggedUser.username},
  {value:this.items[1].value,coins:this.items[1].coins,username:this.UserService.loggedUser.username}]
}
}
  this.store.dispatch(new UserCoinsAction.UpdateCoins(items))
}
//increasing coins in the machine
MachineCoinsReducing(item1:machineState){
 
  let items:machineState[]=[];
  if(this.items.length!==2){
  const  machineState=this.machineState.find(value=> item1.value==value.value);
  const MachineCoins=this.machineState.filter(item=>item.value!==item1.value)
  const coins=  machineState.coins-item1.coins;
  
 this.machineState=MachineCoins;
   items=[...this.machineState,{value:item1.value,coins:coins}];

}

else if(this.items.length==2){
  
  const  machineState=this.machineState.find(value=> this.items[0].value==value.value);
  const machineState1=this.machineState.find(value=> this.items[1].value==value.value);
  const MachineCoins=this.machineState.filter(item=>item.value!==this.items[1].value && item.value!==this.items[0].value)
  const coins1= machineState.coins-this.items[0].coins;
  const coins2= machineState.coins-this.items[1].coins;
  this.machineState=MachineCoins;
  items=[...this.machineState,{value:this.items[0].value,coins:coins1},{value:this.items[1].value,coins:coins2}]
  
  
}
  this.store.dispatch(new MachineStateAction.UpdateCoins(items))
 
}
EvenNumbers(values:number){
  const x=values/2
 let item=this.machineState.find(user=>user.value==x);
 
    if(item!==undefined){ 
       this.item={value:x,coins:2};
       
    }
    else if(item==undefined){
         this.item={value:2,coins:x}
         
    }
  
}
OddNumbers(value:number){
  let largest=0;
  for(let element of this.machineState){
    if(element.value>=largest){
     let item =element.value
      if(value>item){
        largest=item
      }
    
    }
   
  }
  for(let i=1;i<=this.machineState.length;i++){
    const x=largest*i;
    if(value==x){
      this.item={value:largest,coins:i}
      return;
    }
    else if(value!==x && x<value){
           const y=value-x;
          
           
           if(y%2==0){
             const c=y/2
             if(c==this.machineState[i].value){
             this.items=[{value:largest,coins:i},{value:c,coins:2}];
               return;
             }
           else  if(c==this.machineState[i].value){
            this.items=[{value:largest,coins:i},{value:2,coins:c}];
              return;
            }
           }
           else{
            this.items=[{value:largest,coins:i},{value:1,coins:y}];
              
           }
      
    }
  }
}
 
}

