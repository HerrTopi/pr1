import React, { Component } from "react";
import CustomTable from "./CustomTable";
import SplitterLayout from "react-splitter-layout";
import Popup from "./Popup";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { config } from "../config";
class Pairing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false
    };
    this.popupContent = "";
    this.loadExcessData();
  }
  loadExcessData() {
    var self = this;
    fetch(config.url + "rest/excess/getall", {
      mode: "cors"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.initPairing("excess", data);
        console.log(data);
      });
    fetch(config.url + "rest/deficit/getall", {
      mode: "cors"
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.initPairing("deficit", data);
        console.log(data);
      });
  }
  setPair() {
    var deficit = this.deficit();
    var excess = this.excess();
    var self = this;
    if (deficit.pair != -1) {
      this.popupMessage(<h1>Ez a hiány elem már párosítva van!</h1>);
      return;
    }
    if (deficit.status != -1) {
      this.popupMessage(<h1>Ez a hiány elem már státuszozott!</h1>);
      return;
    }
    if (excess.pair != -1) {
      this.popupMessage(<h1>Ez a többlet elem már párosítva van!</h1>);
      return;
    }
    fetch(config.url + "rest/setpair", {
      method: "post",
      mode: "cors",
      headers: {
        //Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        deficit: deficit.selected,
        excess: excess.selected
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        self.props.setPair(deficit.selected, excess.selected);
      });

    console.log(deficit, excess);
  }
  closePopup() {
    this.setState({ popupIsOpen: false });
  }
  popupMessage(content) {
    this.popupContent = content;
    this.setState({ popupIsOpen: true });
    return;
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  Leltár kiértékelése
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/">Főoldal</Link>
                </li>
                <li>
                  <Link to="/overview">Párosított elemek</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {this.state.popupIsOpen && (
          <Popup
            togglePopup={_ => this.closePopup()}
            content={this.popupContent}
          />
        )}
        <br />
        <div className="row">
          <div className="col-xs-3">
            <button className="btn btn-primary" onClick={_ => this.setPair()}>
              Párosítás
            </button>
          </div>
        </div>
        <SplitterLayout>
          <div>
            <h1>Hiány</h1>
            <CustomTable
              type="deficit"
              keys={this.props.deficit.keys}
              content={this.props.deficit.content}
              header={this.props.deficit.header}
              hasPair={true}
              hasStatus={true}
              setClick={click => (this.deficit = click)}
              mutatable={true}
              settings={{
                massStatus: true
              }}
            />
          </div>
          <div>
            <h1>Többlet</h1>
            <CustomTable
              type="excess"
              keys={this.props.excess.keys}
              content={this.props.excess.content}
              header={this.props.excess.header}
              hasPair={true}
              setClick={click => (this.excess = click)}
              mutatable={true}
              settings={{
                massStatus: false
              }}
            />
          </div>
        </SplitterLayout>
      </div>
    );
  }
}
export default Pairing;
/**
 * 
            <CustomTable
              keys={this.props.deficit.keys}
              content={this.props.deficit.content}
              header={this.props.deficit.header}
              hasPair={true}
              hasStatus={true}
              setClick={click => (this.deficit = click)}
            />
 */
