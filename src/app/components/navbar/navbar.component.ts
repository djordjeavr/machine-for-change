import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/UserService';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public UserService:UserService, private router:Router) { }

  ngOnInit(): void {
  }
logout(){
  localStorage.removeItem('user');
  this.router.navigateByUrl('registration');

}
}
