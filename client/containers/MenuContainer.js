import { connect } from "react-redux";
import Menu from "../components/Menu";
import { toJS } from "immutable";

const mapStateToProps = state => {
  console.log(state.getIn(["deficit", "data"]).toJS());
  return {
    deficit: {
      keys: state.getIn(["deficit", "keys"]),
      content: state.getIn(["deficit", "data"]).toJS(),
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
  return {};
};

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu);

export default MenuContainer;
