import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch}  from 'react-router-dom';
import firebase from 'firebase';

import './App.css';
import Home from '../components/Home/Home';
import Navbar from '../components/Navbar/Navbar';
import AllStuff from '../components/AllStuff/AllStuff';
import MyStuff from '../components/MyStuff/MyStuff';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
// import myStuffRequests from '../firebaseRequests/myStuff';
import fbConnection from '../firebaseRequests/connection';
fbConnection();

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
};

const PrivateRoute = ({component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          renderMergedProps(component, props, rest)
        ) : (
          <Redirect
            to={{ pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/mystuff', state: {from: props.location}}}
          />
        )
      }
    />
  );
};

class App extends Component {
  state={
    authed: false,
    stuff: [],
  };

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false});
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  runAway = () => {
    this.setState({authed: false});
  }

  addToHoard = (e) => {
    console.error(e.target);
  };

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navbar
              authed={this.state.authed}
              runAway={this.runAway}
            />
            <div className='container'>
              <div className='row'>
                <Switch>
                  <Route path='/' exact component={Home}/>
                  <PublicRoute
                    path='/register'
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PublicRoute
                    path='/login'
                    authed={this.state.authed}
                    component={Login}
                  />
                  <PrivateRoute
                    path='/mystuff'
                    authed={this.state.authed}
                    component={MyStuff}
                    stuff={this.state.stuff}
                  />
                  <PrivateRoute
                    path='/allstuff'
                    authed={this.state.authed}
                    component={AllStuff}
                    things={this.addToHoard}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
