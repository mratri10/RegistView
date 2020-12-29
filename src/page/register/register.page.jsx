import React, { Component } from "react";
import rki from "../../assets/logo/rki.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="regist-page">
        <h6>Hello Wordl</h6>
        <img src={rki} alt="" style={{ width: 500, height: 500 }} />
      </div>
    );
  }
}

export default Register;
