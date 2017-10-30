import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Popup from "./Popup";

class PopupExcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: JSON.parse(JSON.stringify(this.props.row))
    };
  }

  breakPair() {
    var self = this;
    fetch(config.url + "rest/breakpair", {
      method: "post",
      mode: "cors",
      headers: {
        //Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        deficit: self.props.row.pair,
        excess: self.props.row.id
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.breakPair(self.props.row.pair, self.props.row.id);
      });
  }
  pairingStatus() {
    if (this.props.row.pair == -1) {
      return <h1>Nincs párosítva</h1>;
    }
    if (this.props.row.pair > -1) {
      for (var key in this.props.deficit) {
        if (this.props.deficit[key].id == this.props.row.pair) {
          return (
            <div>
              <div>
                <h1>Párosítva</h1>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={_ => {
                    this.breakPair();
                  }}>
                  Párosítás felbontása
                </button>
              </div>
              <div>
                <h2>Többlet</h2>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Vonalkód</th>
                      <th>Megnevezés</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {this.props.row.barcode}</td>
                      <td> {this.props.row.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2>Hiány</h2>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Vonalkód</th>
                      <th>Megnevezés</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> {this.props.deficit[key].FIELD4}</td>
                      <td> {this.props.deficit[key].FIELD1}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        }
      }
      return <h1>Nincs párosítva</h1>;
    }
  }
  typing(e, val) {
    var row = this.state.row;
    row[val] = e.target.value;
    this.setState({ row });
  }
  changeExcessRow() {
    var self = this;
    fetch(config.url + "rest/excess/update", {
      method: "post",
      mode: "cors",
      headers: {
        //Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.row)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.changeExcessRow(self.state.row);
      });
  }
  render() {
    return (
      <div className="row">
        <button
          className="btn btn-success"
          onClick={_ => this.changeExcessRow()}>
          Módosítások mentése
        </button>
        <div className="row">
          {Object.keys(this.props.row).map((val, ind) => {
            if (val == "__v" || val == "pair" || val == "id") {
              return null;
            }
            return (
              <div key={ind} className="col-xs-6">
                <div className="row">
                  <div className="col-xs-6">{this.props.excessHeader[val]}</div>
                  <div className="col-xs-6">
                    <input
                      type="text form-control"
                      value={this.state.row[val]}
                      placeholder={this.props.row[val]}
                      onChange={e => this.typing(e, val)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row">{this.pairingStatus()}</div>
      </div>
    );
  }
}
export default PopupExcess;
