import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PopupDeficit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.row.status,
      row: this.props.row
    };
  }
  saveStatus() {
    var self = this;
    fetch(config.url + "rest/setstatus", {
      method: "post",
      mode: "cors",
      headers: {
        //Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify([
        {
          id: self.props.row.id,
          status: Number(self.state.selected)
        }
      ])
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.changeStatus(self.props.row.id, self.state.selected);
      });
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
        deficit: self.props.row.id,
        excess: self.props.row.pair
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.breakPair(self.props.row.id, self.props.row.pair);
      });
  }
  pairingStatus() {
    if (this.props.row.pair == -1) {
      return <h1>Nincs párosítva</h1>;
    }
    if (this.props.row.pair > -1) {
      for (var key in this.props.excess) {
        if (this.props.excess[key].id == this.props.row.pair) {
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
                      <td> {this.props.excess[key].barcode}</td>
                      <td> {this.props.excess[key].name}</td>
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
                      <td> {this.props.row.FIELD4}</td>
                      <td> {this.props.row.FIELD1}</td>
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
  render() {
    return (
      <div>
        <div className="row text-center">
          <h1>Info</h1>
        </div>
        {this.props.row.pair == -1 && (
          <div>
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
        )}
        <div className="row">{this.pairingStatus()}</div>
      </div>
    );
  }
}
export default PopupDeficit;
