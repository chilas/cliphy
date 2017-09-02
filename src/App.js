import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Dashboard from './components/Dashboard';
import Create from './components/Create';
import Callback from './components/Callback';

const App = () => {
  console.log("app component running")
  return (
    <div className="container">
      <Router history={browserHistory}>
        <Route path="/" component={Dashboard} />
        <Route path="/create" component={Create} />
        <Route path="/callback" component={Callback} />
      </Router>
    </div>
  );
}

export default App;
