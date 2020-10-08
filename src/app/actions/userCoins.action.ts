import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { UserCoins } from '../models/userCoins';

export const ADD_COINS ='[UserCoins] Add';
export const UPDATE_COINS ='[UserCoins] Update';



export class AddCoins implements Action {
    readonly type = ADD_COINS

    constructor(public payload: UserCoins ) {}
}

export class UpdateCoins implements Action {
    readonly type = UPDATE_COINS

    constructor(public payload: UserCoins[] ) {}
}


export type Actions= AddCoins|UpdateCoins