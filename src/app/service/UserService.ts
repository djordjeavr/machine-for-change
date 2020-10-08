import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'})
export class UserService {

    get loggedUser():User{
        return JSON.parse(localStorage.getItem('user'))|| new User();
    }
}