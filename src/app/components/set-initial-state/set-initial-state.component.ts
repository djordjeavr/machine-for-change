import { Component, OnInit } from '@angular/core';
import { machineState } from 'src/app/models/machineState';
import * as MachineStateAction from '../../actions/machineState.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-initial-state',
  templateUrl: './set-initial-state.component.html',
  styleUrls: ['./set-initial-state.component.scss'],
})
export class SetInitialStateComponent implements OnInit {
  values: machineState = new machineState();
  machineState: machineState[] = [];
  items: machineState[];
  constructor(private store: Store<AppState>, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.store
      .select('machineState')
      .subscribe((state) => (this.machineState = state));
  }
  AddValue() {
    const sameValue = this.machineState.find(
      (value) => this.values.value == value.value
    );

    if (this.values.value !== undefined && this.values.coins !== undefined) {
      if (sameValue == undefined) {
        this.store.dispatch(new MachineStateAction.AddCoins(this.values));
        this.store
          .select('machineState')
          .subscribe((state) => (this.machineState = state)); //function for add values and coins(update coins) and input check
        this.toastr.success('Coins and value were successfully added');
        this.values = new machineState();
      } else {
        this.toastr.success('Coins were successfully added');
        this.updateCoins(sameValue, this.machineState);
        console.log(this.items);
        this.store.dispatch(new MachineStateAction.UpdateCoins(this.items));
        this.values = new machineState();
      }
    } else {
      this.toastr.error('All fields must be filled');
    }
  }
  updateCoins(item: machineState, machineState: machineState[]) {
    const UserCoins = machineState.filter(
      (item) => item.value !== this.values.value
    ); // update coins
    const coins = item.coins + this.values.coins;
    machineState = UserCoins;
    const item1 = { value: item.value, coins: coins };
    this.items = [...machineState, item1];
  }
}
