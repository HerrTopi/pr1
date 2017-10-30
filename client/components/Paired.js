import React, { Component } from "react";
import CustomTable from "./CustomTable";
class Paired extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container-fluid">
        <h1>Párosított, Egyező elemek</h1>
        <select className="form-control" />
        <hr />
        <CustomTable
          type="Other"
          keys={this.props.keys}
          content={this.props.content}
          header={this.props.header}
          hasPair={false}
          hasStatus={false}
          setClick={click => console.log("ok")}
          mutatable={false}
          settings={{
            massStatus: false
          }}
        />
      </div>
    );
  }
}
export default Paired;
