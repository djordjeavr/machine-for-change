import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { machineState } from '../../models/machineState';
import * as MachineStateAction from '../../actions/machineState.action';
import { UserCoins } from 'src/app/models/userCoins';
import * as UserCoinsAction from '../../actions/userCoins.action';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userCoins: UserCoins[] = [];
  machineState: machineState[] = [];
  valueOfPayment: number;
  item: machineState = new machineState();
  item1: machineState = undefined;
  items: machineState[] = [];
  isClicked: boolean = false;
  initialMachineState: machineState[] = [];
  initialUserState: UserCoins[] = [];
  initialState: boolean = false;
  coins: number;
  coins1: number;
  machineState1: machineState[] = [];
  machineState2: machineState[] = [];
  isError: boolean = false;
  constructor(private store: Store<AppState>, private toastr: ToastrService) {}

  @Input() totalValue: number;
  @Output() stateChange: EventEmitter<boolean> = new EventEmitter();
  ngOnInit(): void {
    this.store
      .select('machineState')
      .subscribe((state) => (this.machineState = state));
    this.store
      .select('userCoins')
      .subscribe((state) => (this.userCoins = state));
    this.store
      .select('valueOfPayment')
      .subscribe((state) => (this.valueOfPayment = state));
    this.initialMachineState = this.machineState;
    this.initialUserState = this.userCoins;
    this.initialState = false;
    this.machineState2 = this.machineState;
  }
  counterTotalValue() {
    this.totalValue = 0;
    let value = 0;
    let coins = 0;
    let x = 0;
    if (!this.userCoins) {
      this.totalValue = 0;
      return;
    }

    for (let i = 0; i < this.userCoins.length; i++) {
      value = this.userCoins[i].value;
      coins = this.userCoins[i].coins;
      x += value * coins;
    }
    this.totalValue += x;
  }
  //function for payment
  Pay() {
    if (this.totalValue >= this.valueOfPayment) {
      if (this.totalValue == this.valueOfPayment) {
        this.MachineIncreaseCoins();
        this.UserCoinsReducing();
        this.counterTotalValue();
        console.log(this.machineState);
        console.log(this.userCoins);
        this.toastr.success(`Succesfuly payment`);
      } else if (this.totalValue > this.valueOfPayment) {
        this.MachineIncreaseCoins();
        this.UserCoinsReducing();
        this.CounterCoins();
        if (this.initialState == false) {
          this.MachineCoinsReducing();
          this.UserIncreaseCoins();
          this.store
            .select('machineState')
            .subscribe((state) => (this.machineState = state));
          this.store
            .select('userCoins')
            .subscribe((state) => (this.userCoins = state));
          console.log(this.machineState);
          console.log(this.userCoins);
          this.toastr.success(`Succesfuly payment`);
          this.item = new machineState();
          this.items = [];
          this.coins1 = undefined;
        } else {
          this.toastr.warning('The machine does not have enough coins.');
        }
      }
    } else {
      this.toastr.error('You dont have enough coins');
    }
  }
  //coin return calculation function
  CounterCoins() {
    const values = this.totalValue - this.valueOfPayment;
    const value = this.machineState.find((value) => value.value == values);
    if (value !== undefined) {
      this.item = { value: value.value, coins: 1 };
      return;
    }
    this.OddNumbers(values);
  }
  //function for increasing the coins in machine
  MachineIncreaseCoins() {
    let items: machineState[] = [];
    for (let item of this.userCoins) {
      const MachineCoins = this.machineState.filter(
        (item1) => item.value !== item1.value
      );
      const machineCoins = this.machineState.find(
        (item2) => item.value == item2.value
      );

      if (machineCoins !== undefined) {
        this.machineState = MachineCoins;
        const coins = machineCoins.coins + item.coins;
        items = [...this.machineState, { value: item.value, coins: coins }];
      } else if (machineCoins == undefined) {
        items = [
          ...this.machineState,
          { value: item.value, coins: item.coins },
        ];
      }
      this.store.dispatch(new MachineStateAction.UpdateCoins(items));
    }
  }
  //reducing coins user
  UserCoinsReducing() {
    let items: UserCoins[] = [];
    for (let item of this.userCoins) {
      const UserCoins = this.userCoins.filter(
        (person) => person.value !== item.value
      );

      this.userCoins = UserCoins;
      items = [...this.userCoins];

      this.store.dispatch(new UserCoinsAction.UpdateCoins(items));
    }
  }
  // increasing user the coins
  UserIncreaseCoins() {
    let items: UserCoins[] = [];

    if (this.items.length !== 2) {
      items = [{ value: this.item.value, coins: this.item.coins }];
    } else if (this.items.length >= 2) {
      if (this.item1 == undefined) {
        items = [
          { value: this.items[0].value, coins: this.items[0].coins },
          { value: this.items[1].value, coins: this.items[1].coins },
        ];
      } else {
        items = [
          this.item1,
          { value: this.items[0].value, coins: this.items[0].coins },
          { value: this.items[1].value, coins: this.items[1].coins },
        ];
      }
    }
    this.store.dispatch(new UserCoinsAction.UpdateCoins(items));
    this.counterTotalValue();
  }
  //increasing coins in the machine
  MachineCoinsReducing() {
    let items: machineState[] = [];
    if (this.items.length !== 2) {
      const machineState = this.machineState.find(
        (value) => this.item.value == value.value
      );
      const MachineCoins = this.machineState.filter(
        (item1) => this.item.value !== item1.value
      );
      const coins = machineState.coins - this.item.coins;

      this.machineState = MachineCoins;
      items = [
        ...this.machineState,
        { value: machineState.value, coins: coins },
      ];
    } else if (this.items.length >= 2) {
      const machineState = this.machineState.find(
        (value) => this.items[0].value == value.value
      );
      const machineState1 = this.machineState.find(
        (value) => this.items[1].value == value.value
      );
      const MachineCoins = this.machineState.filter(
        (item) =>
          item.value !== this.items[1].value &&
          item.value !== this.items[0].value
      );
      const coins1 = machineState.coins - this.items[0].coins;
      const coins2 = machineState1.coins - this.items[1].coins;
      this.machineState = MachineCoins;
      if (this.item1 == undefined) {
        items = [
          ...this.machineState,
          { value: this.items[0].value, coins: coins1 },
          { value: this.items[1].value, coins: coins2 },
        ];
      } else if (this.item1 !== undefined) {
        const machineState = this.machineState.find(
          (value) => this.item1.value == value.value
        );
        const MachineCoins1 = this.machineState.filter(
          (item) =>
            item.value !== this.item1.value &&
            item.value !== this.items[1].value &&
            item.value !== this.items[0].value
        );
        this.machineState = MachineCoins1;
        const coins = machineState.coins - this.item1.coins;
        items = [
          ...this.machineState,
          { value: this.item1.value, coins: coins },
          { value: this.items[0].value, coins: coins1 },
          { value: this.items[1].value, coins: coins2 },
        ];
      }
    }
    this.store.dispatch(new MachineStateAction.UpdateCoins(items));
  }
  EvenNumbers(values: number) {
    const x = values / 2;
    let item = this.machineState.find(
      (user) => user.value == x && user.coins >= 2
    );
    const two = this.machineState.find((item) => item.value == 2);
    const one = this.machineState.find((item) => item.value == 1);
    if (item !== undefined) {
      this.item = { value: x, coins: 2 };
    } else if (item == undefined) {
      if (two == undefined || two.coins <= 0 || two.coins < x) {
        if (one == undefined || one.coins < x || one.coins <= 0) {
          this.store.dispatch(
            new UserCoinsAction.UpdateCoins(this.initialUserState)
          );
          this.store.dispatch(
            new MachineStateAction.UpdateCoins(this.initialMachineState)
          );
          this.initialState = true;
        }
      } else {
        this.item = { value: 2, coins: x };
      }
    }
  }
  OddNumbers(value: number) {
    this.isError = false;
    const two = this.machineState.find((item) => item.value == 2);
    const one = this.machineState.find((item) => item.value == 1);
    let largest = 0;
    if (this.machineState2.length == 0) {
      for (let element of this.machineState) {
        if (element.value >= largest) {
          let item = element.value;
          if (value > item) {
            largest = item;
          }
        }
      }
    }
    if (this.machineState2.length !== 0) {
      for (let element of this.machineState2) {
        if (element.value >= largest) {
          let item = element.value;
          if (value > item) {
            largest = item;
          }
        }
      }
    }
    const a = this.machineState.find((item) => item.value == largest);
    if (largest * largest == value && a.coins >= largest) {
      this.item = { value: largest, coins: largest };
      this.isError = true;
      return;
    }
    if (a == undefined) {
      this.store.dispatch(
        new UserCoinsAction.UpdateCoins(this.initialUserState)
      );
      this.store.dispatch(
        new MachineStateAction.UpdateCoins(this.initialMachineState)
      );
      this.initialState = true;
    } else {
      for (let i = a.coins; i > 0; i--) {
        let x = 0;

        if (this.coins1 == undefined) {
          this.coins = i;
          x = largest * this.coins;
        } else {
          this.coins = this.coins1;
          x = largest * this.coins;
        }

        if (value == x) {
          this.item = { value: largest, coins: this.coins };
          this.isError = true;
          return;
        } else if (value !== x && x < value) {
          const y = value - x;
          const item = this.machineState.find(
            (item1) => item1.value == y && item1.coins > 1
          );
          if (item !== undefined) {
            this.items = [
              { value: largest, coins: this.coins },
              { value: y, coins: 1 },
            ];
            this.isError = true;
            return;
          }
          if (y % 2 == 0) {
            let c = y / 2;
            let item = this.machineState.find(
              (user) => user.value == c && user.coins >= 2
            );
            if (item !== undefined && c !== largest) {
              this.items = [
                { value: largest, coins: this.coins },
                { value: c, coins: 2 },
              ];
              this.isError = true;
              return;
            } else if (item == undefined) {
              if (two == undefined || two.coins <= 0 || two.coins < c) {
                if (one == undefined || one.coins <= 0 || one.coins < y) {
                  this.coins1 = i - 1;
                  if (this.coins1 == 0) {
                    this.machineState2 = this.machineState.filter(
                      (item) => item.value !== largest
                    );
                    this.isError = true;
                    this.coins1 = undefined;
                    this.OddNumbers(value);
                    return;
                  } else {
                    this.store.dispatch(
                      new UserCoinsAction.UpdateCoins(this.initialUserState)
                    );
                    this.store.dispatch(
                      new MachineStateAction.UpdateCoins(
                        this.initialMachineState
                      )
                    );
                    this.initialState = true;
                    return;
                  }
                } else {
                  this.items = [
                    { value: largest, coins: this.coins },
                    { value: 1, coins: y },
                  ];
                  this.isError = true;
                  return;
                }
              } else {
                this.items = [
                  { value: largest, coins: this.coins },
                  { value: 2, coins: c },
                ];
                this.isError = true;
                return;
              }
            }
          }
          if (y % 2 !== 0) {
            if (one !== undefined && one.coins >= y) {
              this.items = [
                { value: largest, coins: this.coins },
                { value: 1, coins: y },
              ];
              this.isError = true;
              return;
            }

            if (one !== undefined) {
              this.item1 = { value: largest, coins: this.coins };
              this.OddNumbers(y);
              return;
            }
            this.coins1 = i - 1;
            if (this.coins1 == 0) {
              this.machineState2 = this.machineState.filter(
                (item) => item.value !== largest
              );
              this.isError = true;
              this.coins1 = undefined;
              this.OddNumbers(value);
              return;
            }
            if (value % 2 == 0) {
              const coins = value / 2;
              const checkCoins = this.machineState.find(
                (item) => item.coins >= coins
              );
              if (checkCoins !== undefined) {
                this.EvenNumbers(value);
                return;
              }
            }
          }
        }
      }
      if (this.isError == false) {
        this.store.dispatch(
          new UserCoinsAction.UpdateCoins(this.initialUserState)
        );
        this.store.dispatch(
          new MachineStateAction.UpdateCoins(this.initialMachineState)
        );
        this.initialState = true;
        return;
      }
    }
  }
  backToAddCoins() {
    this.stateChange.emit(this.isClicked);
  }
}
