import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { toJS } from "immutable";
import Pagination from "react-js-pagination";
import { CSVLink, CSVDownload } from "react-csv";
import Popup from "./Popup";
import PopupExcess from "../containers/PopupExcessContainer";
import PopupDeficit from "../containers/PopupDeficitContainer";
import PopupMassStatus from "../containers/PopupMassStatusContainer";

class CustomTable extends Component {
  constructor(props) {
    super(props);

    var visibility = this.props.keys.toJS().reduce((prev, curr) => {
      prev[curr] = true;
      return prev;
    }, {});

    this.state = {
      selected: -1,
      content: this.props.content,
      showPaired: true,
      showStatused: true,
      sortedBy: "",
      sortType: "ASC",
      currentPage: 1,
      rowPerPage: 10,
      maxPage: this.props.content.size,
      massStatus: false,
      massStatusList: [],
      popupMassStatus: false,
      popupDeficit: false,
      popupExcess: false,
      visibility: visibility,
      visibilitySettings: false
    };
    this.filters = {};
    this.editedRow = {};
  }
  componentDidMount() {
    this.props.setClick(() => this.selectedRow());
    this.filters = this.props.header.toJS();
    for (var key in this.filters) {
      this.filters[key] = "";
    }
    this.filter(this.props);
  }
  getRowById(id) {
    var returnIt = null;
    this.props.content.forEach((val, ind) => {
      if (val.get("id") == id) {
        returnIt = val;
      }
    });
    return returnIt;
  }
  selectedRow() {
    var response = { selected: -1, pair: -1, status: -1 };
    if (this.state.selected != -1) {
      var row = this.getRowById(this.state.selected);
      response.selected = this.state.selected;
      response.pair = row.get("pair");
      response.status = row.get("status");
    }
    return response;
  }
  toggleSelection(id) {
    if (!this.state.massStatus) {
      if (this.state.selected == id) {
        this.setState({ selected: -1 });
      } else {
        this.setState({ selected: id });
      }
    } else {
      var massStatusList = this.state.massStatusList;
      if (this.state.massStatusList.indexOf(id) < 0) {
        massStatusList.push(id);
      } else {
        massStatusList.splice(this.state.massStatusList.indexOf(id), 1);
      }
      this.setState({ massStatusList, massStatusList });
    }
  }
  typing(e, id) {
    this.filters[id] = e.target.value;
    this.filter(this.props);
  }
  filter(props) {
    var filteredContent = props.content.filter((val, ind) => {
      var match = true;
      if (
        (!this.state.showPaired && val.get("pair") > -1) ||
        (!this.state.showStatused && Number(val.get("status")) > -1)
      ) {
        return false;
      }
      props.keys.forEach((val2, ind2) => {
        if (!val.get(val2).includes(this.filters[val2])) {
          match = false;
        }
      });
      return match;
    });
    this.setState({ maxPage: filteredContent.size });
    this.setState({
      content: filteredContent.slice(
        (this.state.currentPage - 1) * this.state.rowPerPage,
        this.state.currentPage * this.state.rowPerPage
      )
    });
  }
  sorter(column) {
    if (this.state.sortedBy == column) {
      if (this.state.sortType == "ASC") {
        this.setState({ sortType: "DESC" });
        this.setState({
          content: this.state.content.sort((a, b) => {
            if (a.get(column) < b.get(column)) return 1;
            if (a.get(column) > b.get(column)) return -1;
            return 0;
          })
        });
      } else {
        this.setState({ sortType: "ASC" });
        this.setState({
          content: this.state.content.sort((a, b) => {
            if (a.get(column) < b.get(column)) return -1;
            if (a.get(column) > b.get(column)) return 1;
            return 0;
          })
        });
      }
    } else {
      this.setState({ sortedBy: column });
      this.setState({ sortType: "ASC" });
      this.setState({
        content: this.state.content.sort((a, b) => {
          if (a.get(column) < b.get(column)) return -1;
          if (a.get(column) > b.get(column)) return 1;
          return 0;
        })
      });
    }
  }
  toggleCheckboxValue(what) {
    this.setState({ [what]: !this.state[what] }, () => {
      this.filter(this.props);
    });
  }
  pagination(page) {
    this.setState({ currentPage: page }, _ => {
      this.filter(this.props);
    });
  }
  massStatus(type) {
    if (type == "start") {
      this.setState({ selected: -1 });
      this.setState({ massStatus: true });
      this.setState({ showPaired: false }, _ => {
        this.setState({ showStatused: false }, _ => {
          this.filter(this.props);
        });
      });
    }
    if (type == "end") {
      this.openPopup(this.state.massStatusList, "popupMassStatus");
    }
  }
  openPopup(row, popupName) {
    this.editedRow = row;
    if (popupName != "popupSettings") {
      this.togglePopup(popupName, true);
    } else {
      if (this.props.type == "excess") {
        this.togglePopup("popupExcess", true);
      } else {
        this.togglePopup("popupDeficit", true);
      }
    }
  }
  togglePopup(which, toWhat) {
    if (which == "popupMassStatus" && !toWhat) {
      this.setState({ massStatus: false, massStatusList: [] });
      this.setState({ selected: -1 });
    }
    this.setState({ [which]: toWhat });
  }
  componentWillReceiveProps(nextProps) {
    this.filter(nextProps);
  }
  toggleChange(col) {
    var visibility = this.state.visibility;
    visibility[col] = !visibility[col];
    this.setState({
      visibility: visibility
    });
  }
  toggeVisibilitySettings() {
    this.setState({ visibilitySettings: !this.state.visibilitySettings });
  }
  render() {
    return (
      <div className="container-fluid">
        {this.state.popupMassStatus && (
          <Popup
            togglePopup={_ => this.togglePopup("popupMassStatus", false)}
            content={
              <PopupMassStatus
                type={this.state.massStatus ? "mass" : "single"}
                row={this.editedRow}
              />
            }
          />
        )}
        {this.state.popupDeficit && (
          <Popup
            togglePopup={_ => this.togglePopup("popupDeficit", false)}
            content={<PopupDeficit row={this.editedRow} />}
          />
        )}
        {this.state.popupExcess && (
          <Popup
            togglePopup={_ => this.togglePopup("popupExcess", false)}
            content={<PopupExcess row={this.editedRow} />}
          />
        )}
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-3">
              <CSVLink
                className="btn btn-primary"
                data={this.state.content.toJS()}>
                Excel letöltés
              </CSVLink>
            </div>
            <div className="col-xs-3">
              <button
                className="btn btn-primary"
                onClick={_ => this.toggeVisibilitySettings()}>
                Láthatóság
              </button>
            </div>
            <div className="col-xs-3">
              {this.props.settings.massStatus &&
                !this.state.massStatus && (
                  <button
                    className="btn btn-primary"
                    onClick={_ => this.massStatus("start")}>
                    Tömeges Státusz
                  </button>
                )}
              {this.state.massStatus && (
                <button
                  className="btn btn-primary"
                  onClick={_ => this.massStatus("end")}>
                  Tömeges Státusz beállítása
                </button>
              )}
            </div>
          </div>
          <div className="row">
            {!this.state.massStatus && (
              <div>
                <div className="col-xs-3">
                  {this.props.hasPair && (
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.showPaired}
                        onChange={_ => this.toggleCheckboxValue("showPaired")}
                      />
                      Párosítottak
                    </label>
                  )}
                </div>
                {this.props.hasStatus && (
                  <div className="col-xs-3">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.showStatused}
                        onChange={_ => this.toggleCheckboxValue("showStatused")}
                      />
                      Státuszozottak
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="container-fluid">
          {this.state.visibilitySettings && (
            <div className="row">
              <hr />
              {this.props.keys.map((val, ind) => {
                return (
                  <label key={ind} className="col-xs-3">
                    <input
                      type="checkbox"
                      checked={this.state.visibility[val]}
                      onChange={_ => this.toggleChange(val)}
                    />
                    {this.props.header.get(val)}
                  </label>
                );
              })}
            </div>
          )}
        </div>
        <table className="table">
          <thead>
            <tr>
              {this.props.mutatable && <th>Beáll.</th>}
              {this.props.keys.map((val, ind) => {
                if (!this.state.visibility[val]) {
                  return null;
                }
                return (
                  <th
                    onClick={_ => {
                      this.sorter(val);
                    }}
                    key={ind}>
                    {this.props.header.get(val)}
                  </th>
                );
              })}
            </tr>
            <tr>
              {this.props.mutatable && <th />}

              {this.props.keys.map((val, ind) => {
                if (!this.state.visibility[val]) {
                  return null;
                }
                return (
                  <th key={ind}>
                    <input
                      type="text"
                      onChange={e => {
                        this.typing(e, val);
                      }}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.content.map((row, rowInd) => {
              return (
                <tr
                  key={rowInd}
                  className={
                    this.state.selected == row.get("id")
                      ? "selected"
                      : row.get("pair") > -1
                        ? "paired"
                        : this.props.type == "deficit" &&
                          row.get("status") != -1
                          ? "statused"
                          : this.state.massStatusList.indexOf(row.get("id")) >
                            -1
                            ? "massstatus"
                            : ""
                  }
                  onClick={_ => this.toggleSelection(row.get("id"))}>
                  {this.props.mutatable && (
                    <td>
                      <span>
                        <b
                          onClick={_ =>
                            this.openPopup(row.toJS(), "popupSettings")}>
                          D
                        </b>
                      </span>
                    </td>
                  )}
                  {this.props.keys.map((col, colInd) => {
                    if (!this.state.visibility[col]) {
                      return null;
                    }
                    return <td key={colInd}>{row.get(col)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          prevPageText="prev"
          nextPageText="next"
          firstPageText="first"
          lastPageText="last"
          activePage={this.state.currentPage}
          itemsCountPerPage={this.state.rowPerPage}
          totalItemsCount={this.state.maxPage}
          onChange={page => this.pagination(page)}
        />
      </div>
    );
  }
}
export default CustomTable;
