import React, { Component } from "react";
import Menu from "../containers/MenuContainer";
import Pairing from "../containers/PairingContainer";
import Paired from "../containers/PairedContainer";
import PrintOverview from "./PrintOverview";
import Overview from "./Overview";
import Catalog from "./Catalog";
import Locations from "./Locations";
import { HashRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Menu} />
          <Route exact path="/pairing" component={Pairing} />
          <Route exact path="/paired" component={Paired} />
          <Route exact path="/catalog/:location" component={Catalog} />
          <Route
            exact
            path="/printoverview/:address"
            component={PrintOverview}
          />
          <Route exact path="/overview" component={Overview} />
          <Route exact path="/locations" component={Locations} />
        </div>
      </Router>
    );
  }
}
export default App;
