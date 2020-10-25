import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { machineState } from 'src/app/models/machineState';
import { UserCoins } from 'src/app/models/userCoins';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: UserCoins = new UserCoins();
  machineState: machineState[] = [];
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('machineState')
      .subscribe((state) => (this.machineState = state));
  }
  backToInitialState() {
    this.router.navigateByUrl('set-initial-state');
  }
}
