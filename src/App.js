import React from 'react';
import { BrowserRouter , Switch , HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {authCheckState} from './store/actions/auth'
import {factorsGet} from './store/actions/factorsActions';
import Header from './containers/Header';
import BaseRouter from './routes'

class App extends React.Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  
  render(){
    return (
      <div className="App">
        <BrowserRouter>
         
        <Header/>
            <Switch>
              
            <BaseRouter/>
            
            </Switch> 
        </BrowserRouter>     
      </div>
    );
  }
  
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
    getAllFactors: () => dispatch(factorsGet()) 
  }
}

export default connect(null, mapDispatchToProps)(App);

