import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Popup from "./Popup";

class PopupMassStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.row.status
    };
  }
  saveStatus() {
    var statusArr = [];
    if (this.props.type == "single") {
      statusArr = [
        {
          id: this.props.row.id,
          status: this.state.selected
        }
      ];
      this.props.changeStatus(this.props.row.id, this.state.selected);
    }
    if (this.props.type == "mass") {
      this.props.row.forEach(element => {
        statusArr.push({
          id: element,
          status: this.state.selected
        });
        this.props.changeStatus(element, this.state.selected);
      });
    }
    fetch(config.url + "rest/setstatus", {
      method: "post",
      mode: "cors",
      headers: {
        //Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(statusArr)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log("kk");
      });
  }
  changeStatus(e) {
    this.setState({ selected: e.target.value });
  }
  render() {
    console.log(this.props.row);
    return (
      <div>
        <hr />
        <select
          value={this.state.selected}
          onChange={e => {
            this.changeStatus(e);
          }}>
          {this.props.statusSelect.map((val, ind) => {
            return (
              <option key={ind} value={val.key}>
                {val.value}
              </option>
            );
          })}
        </select>
        <hr />
        <button
          className="btn btn-success"
          onClick={_ => {
            this.saveStatus();
          }}>
          Mentés
        </button>
      </div>
    );
  }
}
export default PopupMassStatus;
