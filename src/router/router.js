import React, { Component } from 'react';
import { HashRouter, Router, Route, Switch, Link } from 'react-router-dom';
//import history from '../core/history';
import '../style/global.common.scss';
import Bundle from './Bundle';
import Home from 'bundle-loader?lazy&name=home!~/containers/Home';
import Counter from 'bundle-loader?lazy&name=counter!~/containers/Counter';
//import NotFound from 'bundle-loader?lazy&name=notFound!~/containers/NotFound/NotFound';

const createComponent = (component) => (props) => (
  <Bundle load = { component }>
    {
      (Component) => Component ? <Component {...props} /> : null
    }
  </Bundle>
)

class RouterMap extends Component {
  constructor(props) {
    super(props);
    this.state= {}
  }

  render() {
    return(
      <HashRouter>
        <div>
          <Route exact path="/" component={createComponent(Home)} />
          <Route path="/counter" component={createComponent(Counter)} />
        </div>
      </HashRouter>
    )
  }
}

export default RouterMap;