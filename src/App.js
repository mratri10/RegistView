import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.components';
import Profile from './page/profile/profile.page';
import Register from './page/register/register.page';
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){

  }
  componentWillUnmount(){

  }
  render() { 
    return (  
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Register}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </div>
    );
  }
}
const mapStateToProps=createStructuredSelector({})
 
export default App;