import React, {Component} from 'react';
import {Link, Switch} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import Subscription from '../components/Subscription';

import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      index: 0
    }
  }

  render() {
    console.log('Route render');
    return (
      <BrowserRouter history={history}>
        <div>
          <Route exact path="/" component={() => (<Subscription />)} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes
