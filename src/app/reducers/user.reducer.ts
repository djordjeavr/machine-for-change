import { Action } from '@ngrx/store'
import { User } from './../models/user'
import * as UserActions from './../actions/user.actions'




const initialState: User={
 
    username:'admin',
    password:'admin',
    role:'ADMIN'
}

  

export  function reducer(state:User[]=[initialState], action: UserActions.Actions){

    switch(action.type){
        case UserActions.ADD_USER:
         
            return [...state,action.payload];
            default:
                return  state;
    }
}

