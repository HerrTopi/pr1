import React, { Component } from "react";
class PrintOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid printoverview">
        <div classNameName="container-fluid overview">
          <div className="row leltariv">
            <div className="col-xs-2">Leltárív</div>
            <div className="col-xs-7" />
            <div className="col-xs-3">
              <img src="http://lorempixel.com/200/200/" />
            </div>
          </div>
          <div className="row header">
            <div className="col-xs-2">Bizonylat száma:</div>
            <div className="col-xs-2">10</div>
          </div>
          <div className="row header">
            <div className="col-xs-2">Költséghely:</div>
            <div className="col-xs-10">asd : asd</div>
          </div>
          <div className="row header">
            <div className="col-xs-2">Leltározás időpontja:</div>
            <div className="col-xs-10">asd - asd</div>
          </div>
          <hr />
          <div className="row tableHeader">
            <div className="col-xs-2">Sorszám</div>
            <div className="col-xs-2">Név</div>
            <div className="col-xs-2">Vonalkód</div>
            <div className="col-xs-2">Gyári szám</div>
            <div className="col-xs-2">Sztsz</div>
            <div className="col-xs-2">Megjegyzés</div>
          </div>
          <div className="row overviewRow" ng-repeat="row in printBody">
            <div className="col-xs-2">asd</div>
            <div className="col-xs-2">ads</div>
            <div className="col-xs-2">asd</div>
            <div className="col-xs-2">asd</div>
            <div className="col-xs-2">asd</div>
            <div className="col-xs-2">asd</div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="container-fluid footer">
            <div className="row">
              <div className="col-xs-2">Ellenőrizte:</div>
              <div className="col-xs-3">
                ............................................................
              </div>
              <div className="col-xs-2" />
              <div className="col-xs-2">Ellenőrizte:</div>
              <div className="col-xs-3">
                ............................................................
              </div>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col-xs-2">Nyomtatás időpontja:</div>
              <div className="col-xs-3">2017.07.15. 14:20</div>
              <div className="col-xs-2" />
              <div className="col-xs-2" />
              <div className="col-xs-3" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default PrintOverview;
