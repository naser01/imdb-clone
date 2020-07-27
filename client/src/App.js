import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme'

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

//import Navbar from './components/Navbar';
import themeFile from './util/theme';
import AuthRoute from './util/AuthRoute';
import UnAuthRoute from './util/UnAuthRoute';
import jwtDecode from 'jwt-decode';
//Redux

import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';

const theme = createTheme(themeFile);

class App extends Component {

  render() {
    //store.dispatch({ type: 'SET_ERRORS' })
    return (

      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div>
              <Link to='/login'>login</Link>
              <Link to='/'>home</Link>
              <Link to='signup'>signup</Link>
              <div >logout</div>
            </div>
            <div className="container">
              <Switch>
                <UnAuthRoute exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/signup' component={Signup} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
