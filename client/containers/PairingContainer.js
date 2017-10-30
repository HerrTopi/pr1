import { connect } from "react-redux";
import Pairing from "../components/Pairing";
import { setPair } from "../actions/actions.js";
import { initPairing } from "../actions/actions.js";
import { toJS } from "immutable";

const mapStateToProps = state => {
  console.log(state.getIn(["deficit", "data"]).toJS());
  return {
    deficit: {
      keys: state.getIn(["deficit", "keys"]),
      content: state.getIn(["deficit", "data"]),
      header: state.getIn(["deficit", "header"])
    },
    excess: {
      keys: state.getIn(["excess", "keys"]),
      content: state.getIn(["excess", "data"]),
      header: state.getIn(["excess", "header"])
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPair: (deficit, excess) => {
      dispatch(setPair(deficit, excess));
    },
    initPairing: (initType, data) => {
      dispatch(initPairing(initType, data));
    }
  };
};

const PairingContainer = connect(mapStateToProps, mapDispatchToProps)(Pairing);

export default PairingContainer;
