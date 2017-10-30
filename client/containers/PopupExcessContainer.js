import { connect } from "react-redux";
import PopupExcess from "../components/PopupExcess";
import { changeStatus } from "../actions/actions";
import { breakPair } from "../actions/actions";
import { changeExcessRow } from "../actions/actions";

const mapStateToProps = state => {
  return {
    deficit: state.getIn(["deficit", "data"]).toJS(),
    excessHeader: state.getIn(["excess", "header"]).toJS()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: (id, status) => {
      dispatch(changeStatus(id, status));
    },
    breakPair: (deficit, excess) => {
      dispatch(breakPair(deficit, excess));
    },
    changeExcessRow: (deficit, excess) => {
      dispatch(changeExcessRow(deficit, excess));
    }
  };
};

const PopupExcessContainer = connect(mapStateToProps, mapDispatchToProps)(
  PopupExcess
);

export default PopupExcessContainer;
