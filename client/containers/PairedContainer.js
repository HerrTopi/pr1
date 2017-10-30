import { connect } from "react-redux";
import Paired from "../components/Paired";
import { toJS } from "immutable";

const mapStateToProps = state => {
  return {
    keys: state.getIn(["paired", "keys"]),
    header: state.getIn(["paired", "header"]),
    content: state.getIn(["paired", "data"])
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PairedContainer = connect(mapStateToProps, mapDispatchToProps)(Paired);

export default PairedContainer;
