import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Popup from "./Popup";
import t from "tcomb-form";
import { config } from "../config";

const Form = t.form.Form;
const validate = t.validate;

//CONSTRAINTS!!!!
const Positive = t.refinement(t.Number, n => n >= 0);
const Car = t.enums({
  M: "Male",
  F: "Female"
});

const Select = t.struct({
  barcode: Car
});
const Person = t.struct({
  barcode: t.Num,
  oldBarcode: t.Num,
  factoryNumber: t.Num,
  itemNumber: t.Num,
  name: t.String,
  building: t.String,
  room: t.String,
  activationDate: t.maybe(t.Date),
  classTag: t.String,
  personalNumber: t.String,
  firm: t.String,
  sidenote: t.String
});
const options = {
  config: {
    // for each of lg md sm xs you can specify the columns width
    horizontal: {
      md: [2, 10],
      sm: [3, 9]
    }
  },
  // you can use strings or JSX
  legend: <i>Leltározás</i>,
  fields: {
    barcode: {
      legend: <b>Vonalkód</b>,
      options: [{ value: "Audi", text: "Audiiiiiiiiiiii" }]
    },
    oldBarcode: {
      legend: <b>Régi vonalkód</b>
    },
    factoryNumber: {
      legend: <b>Gyáriszám</b>
    },
    itemNumber: {
      legend: <b>Eszközszám</b>
    },
    name: {
      legend: <b>Eszköz megnevezés (kötelező)</b>
    },
    building: {
      legend: <b>Épület (kötelező)</b>
    },
    room: {
      legend: <b>Helyiség (kötelező)</b>
    },
    activationDate: {
      legend: <b>Aktiválási dátum</b>
    },
    classTag: {
      legend: <b>Osztály</b>
    },
    personalNumber: {
      legend: <b>Személyügyi törzsszám</b>
    },
    firm: {
      legend: <b>Vállalat</b>
    },
    sidenote: {
      legend: <b>Megjegyzés</b>
    }
  }
};
class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  save() {
    // call getValue() to get the values of the form
    var tmpValue = this.form.getValue();
    // if validation fails, value will be null
    if (tmpValue) {
      let value = Object.assign(
        { address: this.props.match.params.location },
        tmpValue
      );
      console.log(value);
      fetch(config.url + "rest/excess/new", {
        method: "post",
        mode: "cors",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(value)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
        });
      // value here is an instance of Person
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="#">
                  Leltározás
                </a>
              </div>
              <ul className="nav navbar-nav">
                <li className="active">
                  <Link to="/">Főoldal</Link>
                </li>
                <li>
                  <Link to="/locations">költséghely választás</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <Form
          options={options}
          ref={input => {
            this.form = input;
          }}
          type={Person}
        />
        <button className="btn btn-primary" onClick={_ => this.save()}>
          Mentés
        </button>
      </div>
    );
  }
}
export default Catalog;
