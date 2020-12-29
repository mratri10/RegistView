import React, { Component } from "react";
import rki from "../../assets/logo/rki.png";
import eyetech from "../../assets/logo/eyetech.png"
import "./register.styles.scss";
import FormInput from "../../components/form-input/form-input.components";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
  onHandleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }
  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="register">
        <div className="img-regist">
          <img className="img" src={eyetech} alt="" style={{ objectFit: "cover", height: '100%', width: "100%", flexWrap: 'wrap', display: 'flex' }} />
        </div>
        <div className="form-regist">
          <h2 className='title'>Daftar Anggota Koperasi</h2>
          <span>Silahkan memasukan data anda sebagai Anggota Koperasi</span>
          <form className="form-input">
            <FormInput type="text" name="displayName" value={displayName} onChange={this.onHandleChange} label='Display Name' required />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
