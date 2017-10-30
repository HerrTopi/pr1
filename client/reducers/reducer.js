import { CHANGE_STATUS } from "../actions/actionList";
import { BREAK_PAIR } from "../actions/actionList";
import { SET_PAIR } from "../actions/actionList";
import { CHANGE_EXCESS_ROW } from "../actions/actionList";
import { INIT_PAIRING } from "../actions/actionList";
import { fromJS, toJS, Map, List } from "immutable";
import { initialState } from "./store";

const reducer = (state = initialState, action) => {
  if (action.type == CHANGE_STATUS) {
    var arr = state.getIn(["deficit", "data"]);
    const index = arr.findIndex(i => i.get("id") == action.id);
    const newArr = state.updateIn(["deficit", "data", index], element => {
      return element.set("status", Number(action.status));
    });
    //console.log(newArr);
    return newArr;
  }
  if (action.type == BREAK_PAIR) {
    var defArr = state.getIn(["deficit", "data"]);
    const defIndex = defArr.findIndex(i => i.get("id") == action.deficit);

    var excArr = state.getIn(["excess", "data"]);
    const excIndex = excArr.findIndex(i => i.get("id") == action.excess);

    const newArr = state
      .updateIn(["deficit", "data", defIndex], element => {
        return element.set("pair", -1);
      })
      .updateIn(["excess", "data", excIndex], element => {
        return element.set("pair", -1);
      });
    console.log("BREAK_PAIR", action.deficit, action.excess);
    return newArr;
  }
  if (action.type == SET_PAIR) {
    var defArr = state.getIn(["deficit", "data"]);
    const defIndex = defArr.findIndex(i => i.get("id") == action.deficit);

    var excArr = state.getIn(["excess", "data"]);
    const excIndex = excArr.findIndex(i => i.get("id") == action.excess);

    const newArr = state
      .updateIn(["deficit", "data", defIndex], element => {
        return element.set("pair", action.excess);
      })
      .updateIn(["excess", "data", excIndex], element => {
        return element.set("pair", action.deficit);
      });
    console.log("SET_PAIR", action.deficit, action.excess);
    return newArr;
  }
  if (action.type == CHANGE_EXCESS_ROW) {
    var arr = state.getIn(["excess", "data"]);
    const index = arr.findIndex(i => i.get("id") == action.row.id);

    return state.setIn(["excess", "data", index], fromJS(action.row));
  }
  if (action.type == INIT_PAIRING) {
    return state.setIn([action.initType, "data"], fromJS(action.data));
  }

  return state;
};

export default reducer;
