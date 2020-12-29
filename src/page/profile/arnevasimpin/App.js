import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import ArnevaSimpin from './src';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <Provider store={store}>
        <ArnevaSimpin />
      </Provider>
    );
  }
}
 
export default App;
