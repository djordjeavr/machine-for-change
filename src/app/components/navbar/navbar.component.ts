import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { machineState } from 'src/app/models/machineState';
import { UserCoins } from 'src/app/models/userCoins';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
user:UserCoins=new UserCoins();
machineState:machineState[]=[];
  constructor(public UserService:UserService, private router:Router,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.user= JSON.parse(localStorage.getItem('user') );
    this.store.select('machineState').subscribe(state=>this.machineState=state); 
  }
backToInitialState(){
  this.router.navigateByUrl('set-initial-state');

}
}
