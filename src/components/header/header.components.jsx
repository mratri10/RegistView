import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import rki from "../../assets/logo/rki.png";
import "./header.styles.scss";

const Header = ({}) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <img className="logo" src={rki} alt="" />
    </Link>
    <div className="options">
      <Link className="option" to="/profile">
        Profile
      </Link>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({});
export default connect(mapStateToProps)(Header);
