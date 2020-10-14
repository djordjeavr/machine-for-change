import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from './UserService';
import { AppState } from 'src/app/app.state';
import {Store} from '@ngrx/store'
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private router:Router, private userService:UserService, private store: Store<AppState>){}
    canActivate(): boolean  {
       const loggedUser=this.userService.loggedUser;
      let valueOfPayment:number;
       this.store.select('valueOfPayment').subscribe(state=>valueOfPayment=state); 
       
       if(!loggedUser.username || valueOfPayment==undefined){
           this.router.navigateByUrl('registration');
           return false;
       }
       else{
           return true;
       }
    }
}