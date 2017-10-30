import { connect } from "react-redux";
import PopupMassStatus from "../components/PopupMassStatus";
import { changeStatus } from "../actions/actions";

const mapStateToProps = state => {
  return {
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
    }
  };
};

const PopupMassStatusContainer = connect(mapStateToProps, mapDispatchToProps)(
  PopupMassStatus
);

export default PopupMassStatusContainer;
