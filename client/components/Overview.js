import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
class Overview extends Component {
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
      }
    };
  }
  locationRows() {
    var output = [];
    for (let key in this.state.locations) {
      output.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{this.state.locations[key]}</td>
          <td>
            <Link to={"printoverview/" + key} target="_blank">
              ->
            </Link>
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
                  Összefoglaló
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/">Főoldal</Link>
                </li>
                <li>
                  <Link to="/pairing">Leltár kiértékelése</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="row">
          <br />

          <table className="table">
            <thead>
              <tr>
                <th>Kód</th>
                <th>Cím</th>
                <th>Áttekintő</th>
              </tr>
            </thead>
            <tbody>{this.locationRows()}</tbody>
          </table>
          <button className="btn btn-primary">
            Felleltározott eszközök listája
          </button>
          <hr />
        </div>
      </div>
    );
  }
}
export default Overview;
