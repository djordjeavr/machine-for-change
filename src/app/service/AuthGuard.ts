import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './UserService';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private router:Router, private userService:UserService){}
    canActivate(): boolean  {
       const loggedUser=this.userService.loggedUser;
       if(!loggedUser.username){
           this.router.navigateByUrl('registration');
           return false;
       }
       else{
           return true;
       }
    }
}