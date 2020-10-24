import { machineState } from '../models/machineState';
import * as MachineStateAction from '../actions/machineState.action';

const initialState: machineState[] = [];

let valueOfPayment: number;

export function machineStateReducer(
  state: machineState[] = initialState,
  action: MachineStateAction.Actions
) {
  switch (action.type) {
    case MachineStateAction.ADD_COINS:
      return [...state, action.payload];
    case MachineStateAction.UPDATE_COINS:
      state = action.payload;

      return state;
      
    default:
      return state;
  }
}

export function valueOfPaymentReducer(
  state: number = valueOfPayment,
  action: MachineStateAction.Actions
) {
  switch (action.type) {
    case MachineStateAction.CHANGE_VALUE_OF_PAYMENT:
      state = action.payload;
      return state;
    default:
      return state;
  }
}
