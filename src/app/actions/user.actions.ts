import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import {User} from './../models/user'

export const ADD_USER ='[USER] Add'


export class AddUser implements Action {
    readonly type = ADD_USER

    constructor(public payload: User) {}
}

export type Actions= AddUser