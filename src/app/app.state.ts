import { machineState } from "./models/machineState";
import { User } from './models/user';
import { UserCoins } from './models/userCoins';

export interface AppState {
    valueOfPayment:number,
    machineState:machineState[],
    user:User[];
    userCoins:UserCoins[];
    }