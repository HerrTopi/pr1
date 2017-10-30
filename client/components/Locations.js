import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { config } from "../config";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {
        CM097: "Bp.XIII.Pozsonyi út 77-79.",
        C16J0: "Törökbálint ,Torbágy u. 1. számítógép kp  3207 hrsz",
        "2471C1II": "Baracska,  számítógép központ 0102/680101/7  hrsz.",
        MH001: "Bp.IX Lechner Ödön stny. 1.",
        "490L": "Zalaegerszeg,Kossuth L. u. 8.",
        "452L": "Szombathely,Kőszegi u.10.",
        "474F": "Miskolc,Széchenyi utca 3-9.",
        "069L": 'Bp.IX.Lechner Ödön fasor 9. "H" - Épület',
        "8221": 'Bp.IX.Lechner Ödön fasor 9. "K" - Épület'
      },
      itemsLeft: {
        CM097: 0,
        C16J0: 0,
        "2471C1II": 0,
        MH001: 0,
        "490L": 0,
        "452L": 0,
        "474F": 0,
        "069L": 0,
        "8221": 0
      }
    };
  }
  componentDidMount() {
    var self = this;
    for (let key in this.state.locations) {
      fetch(config.url + "rest/countaddress/" + key)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var itemsLeft = self.state.itemsLeft;
          itemsLeft[key] = data[key];
          self.setState({ itemsLeft: itemsLeft });
        });
    }
  }
  locationRows() {
    var output = [];
    for (let key in this.state.locations) {
      output.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{this.state.locations[key]}</td>
          <td>{this.state.itemsLeft[key]}</td>
          <td>
            <Link to={"catalog/" + key}> -> </Link>
          </td>
        </tr>
      );
    }
    return output;
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  Költséghelyek
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/">Főoldal</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="row text-center">
          <h1>Költséghelyek</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Kód</th>
              <th>Cím</th>
              <th>Hátralevő tételek</th>
              <th>Leltározás</th>
            </tr>
          </thead>
          <tbody>{this.locationRows()}</tbody>
        </table>
      </div>
    );
  }
}
export default Locations;
