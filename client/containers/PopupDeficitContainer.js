import { connect } from "react-redux";
import PopupDeficit from "../components/PopupDeficit";
import { changeStatus } from "../actions/actions";
import { breakPair } from "../actions/actions";
import { toJS } from "immutable";

const mapStateToProps = state => {
  return {
    excess: state.getIn(["excess", "data"]).toJS(),
    statusSelect: [
      {
        key: -1,
        value: "nincs"
      },
      {
        key: 0,
        value: "asd"
      },
      {
        key: 1,
        value: "qwe"
      },
      {
        key: 2,
        value: "yxc"
      },
      {
        key: 3,
        value: "rtz"
      }
    ]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: (id, status) => {
      dispatch(changeStatus(id, status));
    },
    breakPair: (deficit, excess) => {
      dispatch(breakPair(deficit, excess));
    }
  };
};

const PopupDeficitContainer = connect(mapStateToProps, mapDispatchToProps)(
  PopupDeficit
);

export default PopupDeficitContainer;
