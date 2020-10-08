import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import {machineState} from '../models/machineState'

export const ADD_COINS ='[MachineState] Add';
export const UPDATE_COINS ='[MachineState] Update';
export const CHANGE_VALUE_OF_PAYMENT='[MachineState] Change'


export class AddCoins implements Action {
    readonly type = ADD_COINS

    constructor(public payload:machineState ) {}
}

export class UpdateCoins implements Action {
    readonly type = UPDATE_COINS

    constructor(public payload: machineState[] ) {}
}


export class ChangeValueOfPayment implements Action{
  readonly type=CHANGE_VALUE_OF_PAYMENT
  constructor(public payload: number ) {}
}

export type Actions= AddCoins|UpdateCoins|ChangeValueOfPayment