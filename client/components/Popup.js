import React, { Component } from "react";

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="popup">
        <div className="popupcontent">
          <span onClick={_ => this.props.togglePopup()}>
            <h1 style={{ cursor: "pointer" }}>X</h1>
          </span>
          {this.props.content}
        </div>
      </div>
    );
  }
}
export default Popup;
