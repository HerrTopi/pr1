import { BREAK_PAIR } from "./actionList";
import { CHANGE_STATUS } from "./actionList";
import { SET_PAIR } from "./actionList";
import { CHANGE_EXCESS_ROW } from "./actionList";
import { INIT_PAIRING } from "./actionList";

export const changeStatus = (id, status) => {
  return {
    type: CHANGE_STATUS,
    id,
    status
  };
};
export const breakPair = (deficit, excess) => {
  return {
    type: BREAK_PAIR,
    deficit,
    excess
  };
};
export const setPair = (deficit, excess) => {
  return {
    type: SET_PAIR,
    deficit,
    excess
  };
};
export const changeExcessRow = row => {
  return {
    type: CHANGE_EXCESS_ROW,
    row
  };
};
export const initPairing = (initType, data) => {
  return {
    type: INIT_PAIRING,
    initType,
    data
  };
};
