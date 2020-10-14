import {UserCoins} from '../models/userCoins'
import *as UserCoinsAction from '../actions/userCoins.action'



export function UserCoinsReducer(state:UserCoins[]=[], action:UserCoinsAction.Actions){

    switch(action.type){
        case UserCoinsAction.ADD_COINS:
                return [...state,action.payload];
      case UserCoinsAction.UPDATE_COINS:
          
          state=action.payload
          
          return state;
          case UserCoinsAction.REMOVE_USER_COINS:
            state=action.payload;
            return state;
            default:
         
                return  state;
    }

}