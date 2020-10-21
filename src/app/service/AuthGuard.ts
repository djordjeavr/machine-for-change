import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AppState } from 'src/app/app.state';
import {Store} from '@ngrx/store'
import { machineState } from '../models/machineState';
@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private router:Router, private store: Store<AppState>){}
    canActivate(): boolean  {
      let machineState:machineState[]=[];
       this.store.select('machineState').subscribe(state=>machineState=state); 
       if(machineState.length==0){
           this.router.navigateByUrl('set-initial-state');
           return false;
       }
       else{
           return true;
       }
    }
}