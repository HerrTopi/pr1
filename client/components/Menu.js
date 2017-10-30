import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Popup from "./Popup";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import SplitterLayout from "react-splitter-layout";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center">
          <Link to="/locations">
            <button className="btn btn-primary menuButton">Leltározás</button>
          </Link>
        </div>
        <div className="row text-center">
          <Link to="/overview">
            <button className="btn btn-primary menuButton">Áttekintő</button>
          </Link>
        </div>
        <div className="row text-center">
          <Link to="/pairing">
            <button className="btn btn-primary menuButton">
              Leltár kiértékelés
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
export default Menu;
