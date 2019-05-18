import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import firebase from "../../../Config/firebase";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("Logged Out Successfully");
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <Link className="navbar-brand mb-0 h1" to="/">
            OA
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community">
                Community
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={this.logOut}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}

export default Navbar;
