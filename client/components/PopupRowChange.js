import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PopupRowChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.row.status,
      row: this.props.row
    };
  }
  saveStatus() {
    this.props.changeStatus(this.props.row.id, this.state.selected);
    console.log(this.state.selected);
  }
  changeStatus(e) {
    this.setState({ selected: e.target.value });
  }
  typing(e, key) {
    console.log(e.target.value, key);
    /* var newState = Object.assign({}, this.state);
    newState.row[key] = e.target.value;
    this.setState({ : newrowElement });*/
  }
  rowForm() {
    var output = [];
    for (var key in this.props.row) {
      output.push(
        <div key={key}>
          {key}
          <input
            type="text"
            value={this.state.row[key]}
            onChange={e => {
              this.typing(e, key);
            }}
          />
        </div>
      );
    }
    return output;
  }
  render() {
    return <div>{this.rowForm()}</div>;
  }
}
export default PopupRowChange;
